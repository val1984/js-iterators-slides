// next, return, throw & for..of loop are nice but we want more!
// Don't forget to switch to ESNext in tsconfig.json!

function* naturals() {
  let current = 0;
  while (true) {
    yield current++;
  }
}

// Let's discard the first 3 values, double the 5 values, take 5 of them and print them
naturals().drop(3).map(n => n * 2).take(5).forEach(n => console.log(n));