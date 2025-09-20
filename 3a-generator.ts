// Generators enable us to create iterable iterators more easily

function* naturals() {

}

for (const n of naturals()) {
  console.log(n);
  if (n >= 10) break;
}