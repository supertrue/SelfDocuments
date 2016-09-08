extern float ceilf(float);

extern double ceil(double);

extern long double ceill(long double);

extern float floorf(float);

extern double floor(double);

extern long double floorl(longdouble);

extern float roundf(float);

extern double round(double);

extern long double roundl(longdouble);

round：如果参数是小数，则求本身的四舍五入。

ceil：如果参数是小数，则求最小的整数但不小于本身.

floor：如果参数是小数，则求最大的整数但不大于本身. 

Example:如何值是3.4的话，则

3.4 -- round 3.000000

 -- ceil 4.000000

 -- floor 3.00000

CGRectMake(floorf(self.view.bounds.size.width\*0.5f -39.f\*0.5f),self.view.bounds.size.height -57, 39, 39)

其中floorf(self.view.bounds.size.width\*0.5f -39.f\*0.5f)返回值为

**140.000000这种形式**