//

// HMDatumPaymentVC.m

// HuiMai

//

// Created by chew on 16/7/2.

// Copyright © 2016年 Linxun.com. All rights reserved.

//

\#import "HMDatumPaymentVC.h"

\#import "HMDatumPaymentCell.h"

// 支付相关

\#import "Order.h"

\#import "DataSigner.h"

\#import \<AlipaySDK/AlipaySDK.h\>

\#import "HMPaymentModel.h"

@interface HMDatumPaymentVC() \<UITableViewDataSource, UITableViewDelegate\>

{

 NSInteger indexPathRow;

}

@property (nonatomic, strong) HMPaymentResponseModel \*paymentRequestModel;

@property (nonatomic, strong) HMPaymentModel \*paymentModel;

@property (weak, nonatomic) IBOutlet UIButton \*btnConfirmPay; // 确认支付按钮

@property (nonatomic, copy) NSNumber \*userId;

@property (nonatomic, copy) NSNumber \*amount;

@property (nonatomic, copy) NSNumber \*receiverId;

@property (nonatomic, copy) NSNumber \*filedId;

@end

@implementation HMDatumPaymentVC 

\#pragma mark - life Cycle

- (void)viewDidLoad {

 [super viewDidLoad];

 self.title = @"支付中心";

 self.lblAmount.text = [self.amount stringValue];

 [self.btnConfirmPay addTarget:self action:@selector(btnConfimPay) forControlEvents:UIControlEventTouchUpInside];

 self.payMentTabView.dataSource = self;

 self.payMentTabView.delegate = self;

 [self.view addSubview:self.payMentTabView];

 self.paymentRequestModel = [[HMPaymentResponseModel alloc]init];

 self.paymentModel = [[HMPaymentModel alloc]init];

}

- (void)viewWillAppear:(BOOL)animated {

// [self.navigationController setToolbarHidden:YES];

}

- (void)viewWillDisappear:(BOOL)animated {

// [self.navigationController setToolbarHidden:NO];

}

- (void)dealloc {

 [self.paymentRequestModel cancelFetchPaymentOperation];

}

- (void)payMentForLoginUserId:(NSNumber \*)userId amount:(NSNumber \*)amount receiverId:(NSNumber \*)receiverId fileId:(NSNumber \*)filedId {

 self.userId = userId;

 self.amount = amount;

 self.receiverId = receiverId;

 self.filedId = filedId;

}

\#pragma mark - PayMent Methods

// 确认支付Btn

- (void)btnConfimPay {

 DebugLog(@"点我了");

 if (indexPathRow == 0) {

 // 调用支付宝SDK

\#pragma mark 商品信息待从接口获取

 [self fetchPayment];

 } else if (indexPathRow == 1) {

 // 调用微信SDK

 UIAlertView \*alert = [[UIAlertView alloc]initWithTitle:nil message:@"攻城狮正在加班加点 🙈" delegate:self cancelButtonTitle:@"Use AliPay" otherButtonTitles:@"Are You Sure?", nil];

 [alert show];

\#pragma mark 微信支付待实现

 }

}

- (void)fetchPayment {

 \_\_weak typeof(self) weakSelf = self;

 [self.paymentRequestModel fetchFilePaymentForloginUserId:self.userId

 amount:self.amount

 receiverId:self.receiverId

 fileId:[self.filedId stringValue]

 completionHandler:^(HMPaymentResponseModel \*model) {

 weakSelf.paymentModel = model.alipayInfo;

 [weakSelf alipay];

 } errorHandler:^(NSError \*error) {

 }];

}

- (void) alipay {

 NSString \*partner = self.paymentModel.partner;

 NSString \*seller = self.paymentModel.seller\_id;

 NSString \*privateKey = self.paymentModel.private\_key;

 //partner和seller获取失败,提示

 if ([partner length] == 0 ||

 [seller length] == 0 ||

 [privateKey length] == 0)

 {

 UIAlertView \*alert = [[UIAlertView alloc] initWithTitle:@"提示"

 message:@"缺少partner或者seller或者私钥。"

 delegate:self

 cancelButtonTitle:@"确定"

 otherButtonTitles:nil];

 [alert show];

 return;

 }

 /\*

 \*生成订单信息及签名

 \*/

 //将商品信息赋予AlixPayOrder的成员变量

 Order \*order = [[Order alloc] init];

 order.partner = partner;

 order.seller = seller;

 order.tradeNO = self.paymentModel.orderId;

 order.productName = self.paymentModel.subject; //商品标题 

 order.productDescription = self.paymentModel.body; //商品描述 //Test-新邻讯-充值

 order.amount = self.paymentModel.total\_fee; //商品价格 //1

 order.notifyURL = self.paymentModel.notify\_url;//回调URL //<http://lxpayment.linxun.com/lxpay/alipayNotify>

 order.service = @"mobile.securitypay.pay";//固定

 order.paymentType = @"1";//固定

 order.inputCharset = @"utf-8";//固定

 order.itBPay = @"30m";//固定

 order.showUrl = @"m.alipay.com";//固定

 //应用注册scheme,在AlixPayDemo-Info.plist定义URL types 用于快捷支付成功后重新唤起商户应用

 NSString \*appScheme = @"huiyijia"; // 跟本地的urlScheme 保持一致

 //将商品信息拼接成字符串

 NSString \*orderSpec = [order description];

 NSLog(@"orderSpec = %@",orderSpec);

 //获取私钥并将商户信息签名,外部商户可以根据情况存放私钥和签名,只需要遵循RSA签名规范,并将签名字符串base64编码和UrlEncode

 id\<DataSigner\> signer = CreateRSADataSigner(privateKey);

 NSString \*signedString = [signer signString:orderSpec];

 //将签名成功字符串格式化为订单字符串,请严格按照该格式

 NSString \*orderString = nil;

 if (signedString != nil) {

 orderString = [NSString stringWithFormat:@"%@&sign=\\"%@\\"&sign\_type=\\"%@\\"",

 orderSpec, signedString, @"RSA"];

 [[AlipaySDK defaultService] payOrder:orderString fromScheme:appScheme callback:^(NSDictionary \*resultDic) {

 if ([[resultDic objectForKey:@"resultStatus"] intValue]==9000) {

 // 9000 订单支付成功

 // 8000 正在处理中

 // 4000 订单支付失败

 // 6001 用户中途取消

 // 6002 网络连接出错

 self.btnConfirmPay.backgroundColor = [UIColor grayColor];

 self.btnConfirmPay.titleLabel.text = @"完成支付";

 self.btnConfirmPay.userInteractionEnabled = NO;

 UIAlertView \*alertVS = [[UIAlertView alloc]initWithTitle:@"支付成功" message:@"您已经支付成功" delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"确认", nil];

 [alertVS show];

 //这里的9000，表示支付成功，我们这里可以调用一个服务器接口，告诉服务器，支付完毕。

 }

 if ([[resultDic objectForKey:@"resultStatus"] intValue]==6001) {

 UIAlertView \*alert = [[UIAlertView alloc]initWithTitle:@"中途退出" message:@"中途退出了重新支付" delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"确认", nil];

 [alert show];

 }

 NSLog(@"reslut = %@",resultDic);

 }];

 }

}

\#pragma mark - \<UITableViewDelegate\>

- (void)tableView:(UITableView \*)tableView didSelectRowAtIndexPath:(NSIndexPath \*)indexPath {

 [tableView deselectRowAtIndexPath:indexPath animated:YES];

}

\#pragma mark - \<UITableViewDataSource\>

- (NSInteger)numberOfSectionsInTableView:(UITableView \*)tableView {

 return 1;

}

- (NSInteger)tableView:(UITableView \*)tableView numberOfRowsInSection:(NSInteger)section {

 return 2;

}

- (UITableViewCell \*)tableView:(UITableView \*)tableView cellForRowAtIndexPath:(NSIndexPath \*)indexPath {

 static NSString \*identifier = @"HMDatumPaymentCell";

 HMDatumPaymentCell \*cell = [tableView dequeueReusableCellWithIdentifier:identifier];

 if (cell == nil) {

 cell = [[HMDatumPaymentCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:identifier];

 }

 [cell.btnChoice setImage:[UIImage imageNamed:@"choice"] forState:UIControlStateSelected];

 //

 if (indexPath.row == 0) {

 // 支付宝cell

 cell.ImgViewPay.image = [UIImage imageNamed:@"alipay"];

 cell.lblPayName.text = @"支付宝";

 cell.lblDesc.text = @"推荐支付宝用户使用";

 cell.btnChoice.tag = indexPath.row;

 [cell.btnChoice addTarget:self action:@selector(btnChoiceClick:) forControlEvents:UIControlEventTouchUpInside];

 } else if (indexPath.row == 1) {

 // 微信cell

 cell.ImgViewPay.image = [UIImage imageNamed:@"wechat"];

 cell.lblPayName.text = @"微信支付";

 cell.lblDesc.text = @"推荐微信用户使用";

 cell.btnChoice.tag = indexPath.row;

 [cell.btnChoice addTarget:self action:@selector(btnChoiceClick:) forControlEvents:UIControlEventTouchUpInside];

 [cell.line mas\_makeConstraints:^(MASConstraintMaker \*make) {

 make.left.equalTo(cell.contentView.mas\_left);

 make.right.equalTo(cell.contentView.mas\_right);

 make.bottom.equalTo(cell.contentView.mas\_bottom);

 make.height.equalTo(@0.5);

 }];

 }

 //

 if (indexPathRow == indexPath.row) {

 cell.btnChoice.selected = YES;

 } else {

 cell.btnChoice.selected = NO;

 }

 return cell;

}

// 选择支付方式target

- (void)btnChoiceClick:(UIButton \*)sender {

 DebugLog(@"点我了%zd",sender.tag);

 HMDatumPaymentCell \*cell = (HMDatumPaymentCell \*)[[sender superview]superview];

 NSIndexPath \*path = [self.payMentTabView indexPathForCell:cell];

 indexPathRow = path.row;

 NSIndexSet \*indexSet = [[NSIndexSet alloc]initWithIndex:path.section];

 [self.payMentTabView reloadSections:indexSet withRowAnimation:UITableViewRowAnimationNone];

}

@end