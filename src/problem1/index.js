var sum_to_n_a = function (n) {
  if (n === 0) {
    return n;
  }

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  if (n === 0) {
    return n;
  }

  let sum = 0;
  for (let i = n; i >= 1; i--) {
    sum += i;
  }
  return sum;
};

var sum_to_n_c = function (n) {
  if (n === 0) {
    return 0;
  }
  return n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
