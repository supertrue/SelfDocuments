从系统的UITableViewController跳入控制器再返回来之后，不需要写deselect..因为iOS的SDK默认做了优化，而在viewController中加入了一个UItableView，则需要手动加上delsect.....

\<1\>遇到的问题

\<1\>使用@[].mutableCopy创建可变数组

代码出处:YYKitDemo-\> YYRootViewController

源代码:self.titles = @[].mutableCopy

代码解读:

出处:https://github.com/objc-zen/objc-zen-book

The following **should be avoided**:

> NSMutableArray \*aMutableArray = [@[] mutableCopy];

The problems with the previous notation are both of efficiency and readability. On the efficiency side, an unnecessarily immutable object is created and immediately thrown away; this unlikely will slow down your app (unless the method here is called frequently) but there is really no reason to do this just to save some characters. Regarding the readability, we can see two problems here: the first is that when scanning through the code and seeing `@[]` your mind is immediately connected to and instance of `NSArray`, but in this case you need to stop and check more thoughtfully. Another aspect to take into account is that it would be very likely that someone with less experience will see your code and depending on his background he might not be very comfortable with the dichotomy between mutable and immutable objects. He or she could not be very familiar with the meaning of creating a mutable copy (obviously we are not suggesting that this knowledge is not necessary). Again, this is not something absolutely wrong but is more about code usability (that includes readability).

译文:与先前的语法比较,在效率可可读性上存在问题,在效率方面,一个不必要的不可变对象被创建并且立即释放,它们未必将减慢你的APP(除非这个方法在这里被频繁调用)但是它真的没有必要这样做仅仅是为了保存一些字符;关于可读性方面,我们会看到2个问题,第一个是当浏览代码看到@[]时,你的想法立刻被链接到一个NSArray实例,但是,假若这样你需要停下来检查的更加周到,另一个可以说服你的原因是,可能一个经验非常少的程序员看到你的代码,并且依靠他的背景知识,可能不是非常熟悉,并且会对可变和不可变对象产生歧义,她可能不是很熟悉这个创建mutable copy的语法(明显的我们不认为这个知识点不重要)相反,它不是完全错误的做法,但是更多的是关于这个代码的可用性(包括可读性)

\<2\>关于 - (void)deselectRowAtIndexPath:(NSIndexPath \*)indexPath animated:(BOOL)animated; 的使用

在导航+UITableView同时使用时,选中一个cell,push到下一个ViewController,此时如果back回来,当前的cell依然是选中的状态,解决方法就是使用deselectRowAtIndexPath方法取消选中,我们可能疑惑为什么有的时候不加这句控制器pop回来后选中状态也会消失,原因是因为如果UITableView是在UITableViewController中时,iOS SDK为我们进行了优化,所以可以不必使用deselectRowAtIndexPath方法取消选中状态,但是在在UIViewController中我们一定要使用deselectRowAtIndexPath取消选中状态

如果对项目要求高,一种更理想的方法是

- (void) viewWillAppear: (BOOL)inAnimated {

 NSIndexPath \*selected = [self.tableView indexPathForSelectedRow];

 if(selected) [self.tableView deselectRowAtIndexPath:selected animated:YES];

}

如果这么处理,那么在pop回来的时候,可以提示刚才点进去的是哪一行,在UITableViewController中默认的也是这种效果.