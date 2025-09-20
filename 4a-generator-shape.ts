// Let's explore the shape of a generator return value

function* naturals() {
  let current = 0;
  while (true) {
    yield current++;
  }
  return 42;
}

naturals().