// try compiling with "noImplicitAny" flag:
// tsc --noImplicitAny demo5-noImplicitAny.ts
var x;
////^ demo5-noImplicitAny.ts(1,5): error TS7005: Variable 'x' implicitly has an 'any' type.
x = "";
x = 1;
