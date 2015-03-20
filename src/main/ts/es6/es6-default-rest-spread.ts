function f(x, y=12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
f(3) == 15

function f2(x, ...y) {
  // y is an Array
  return x * y.length;
}
f3(3, "hello", true) == 6

function f3(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument
//f(...[1,2,3]) == 6 