// I thought I could use an iterator directly in a for..of loop

const naturals = {
  current: 0,
  next() {
    return { done: false, value: this.current++ };
  },
  [Symbol.iterator]() {
    return this;
  }
}

// This is called an IterableIterator in TypeScript

for (const n of naturals) {
  console.log(n);
  if (n >= 10) break;
}