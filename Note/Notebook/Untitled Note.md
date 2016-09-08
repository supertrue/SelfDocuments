```objc
// 未封装之前
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [self.view endEditing:YES];
    NSArray *dataArray = self.dataArray[indexPath.section];
    RPCellModel *model = dataArray[indexPath.row];
    if ([model.target canPerformAction:model.action]) {
        [model.target performAction:model.action];
    }
}
```

```objc
// 封装之后(给NSObject加分类)
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [self.view endEditing:YES];
    NSArray *dataArray = self.dataArray[indexPath.section];
    RPPersonalViewModel *model = dataArray[indexPath.row];
    if (model.action) {
        SEL selector = NSSelectorFromString(model.action);
        if (selector && [self respondsToSelector:selector]) {
            ((void (*)(id, SEL, id))[self methodForSelector:selector])(self, selector, nil);
        }
    }
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
}

```