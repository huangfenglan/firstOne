var fn = [];
for (var i = 0; i < 10; i++) {
  fn[i] = function (p) {
    console.log(i + p, 'iiii', i); //10
  };
}

fn[5](5);
var data = { a: 10, b: 20 };
console.log('' + i + '' + data);

// i=5
