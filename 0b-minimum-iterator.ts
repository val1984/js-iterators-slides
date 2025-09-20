// Iterator protocol is quite simple

const iterator: Iterator<number> = {
  next() {
    return { done: true, value: 42 };
  }
}

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());