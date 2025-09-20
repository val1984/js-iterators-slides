// Let's explore the shape of a generator return value

function* naturals() {
  let current = 0;
  while (true) {
    yield current++;
  }
  return 42;
}

// Already seen before
const next = naturals().next();
console.log(next);

// This will close the iterator and return the value 3
const returned = naturals().return(3);
console.log(returned);

// This will immediately throw an error inside the generator
const thrown = naturals().throw(new Error("Boom!"));
console.log(thrown);