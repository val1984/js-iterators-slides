// Let's make it useful

const naturals = {
  current: 0,
  next() {
    return { done: false, value: this.current++ };
  }
}

console.log(naturals.next());
console.log(naturals.next());
console.log(naturals.next());
console.log(naturals.next());
