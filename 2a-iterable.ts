// I thought I could use an iterator directly in a for..of loop

const naturals = {
  current: 0,
  next() {
    return { done: false, value: this.current++ };
  }
}

for (const n of naturals) {
  console.log(n);
  if (n >= 10) break;
}