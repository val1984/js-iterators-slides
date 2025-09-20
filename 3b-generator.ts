// Generators enable us to create iterable iterators more easily

function* naturals() {
  let current = 0;
  while (true) {
    yield current++;
  }
}

for (const n of naturals()) {
  console.log(n);
  if (n >= 10) break;
}