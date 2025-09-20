// Let's make it useful

const naturals = {
  next() {
    return { done: false, value: 42 };
  }
}

console.log(naturals.next());
console.log(naturals.next());
console.log(naturals.next());
console.log(naturals.next());
