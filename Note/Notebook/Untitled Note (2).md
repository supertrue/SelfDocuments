HMAddFriendVC 

HMaddFriendsTVC 添加好友申请，调用后台接口

-(void)viewWillAppear:(BOOL)animated {

 [super viewWillAppear:animated];

 \_unreadCount = 0;

 [[NSNotificationCenter defaultCenter] postNotificationName:@"setupUntreatedApplyCount" object:nil];

}

添加好友透传

HMMainTabBarController

line 1341

- (void)handleFriendRequest:(EMMessage \*)message {

处理透传消息

- (void)handleCmdMessage:(EMMessage \*)message