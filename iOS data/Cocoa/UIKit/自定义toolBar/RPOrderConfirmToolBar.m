//
//  RPOrderConfirmToolBar.m
//  RentPiano
//
//  Created by chew on 16/7/31.
//  Copyright © 2016年 linxun.com. All rights reserved.
//

#import "RPOrderConfirmToolBar.h"

@implementation RPOrderConfirmToolBar

- (void)layoutSubviews {
    [super layoutSubviews];
    CGRect frame = self.bounds;
    frame.size.height = 49;
    self.frame = frame;
}

- (CGSize)sizeThatFits:(CGSize)size {
    CGSize barSize = [super sizeThatFits:size];
    barSize.height = 49;
    return barSize;
}

@end
