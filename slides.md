---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: ./cider-4484017.jpg
# some information about your slides (markdown enabled)
title: Iterators & Generators in EcmaScript
info: |
  ## Iterators & Generators in EcmaScript

  Made with [Sli.dev](https://sli.dev)
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# Iterators & Generators in EcmaScript

Let's learn more about them

<div @click="$slidev.nav.next" class="mt-12 py-1" hover:bg="white op-10">
  Press Space for next page <carbon:arrow-right />
</div>

<div class="abs-br m-6 text-xl">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="slidev-icon-btn">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

<Toc text-sm minDepth="1" maxDepth="2" />

---

# What is an iterator

An iterator is any object that conforms to the <code>Iterator</code> protocol
<v-switch>
<template #1>
```typescript {*} twoslash
const iterator: Iterator<number> = {
};
```
</template>
<template #2>
Let's fix it!
```typescript {monaco-run}{height: '150px'}
const iterator: Iterator<number> = {
};
```
</template>
</v-switch>


---

# Okay but what can I do with an Iterator?

You can call `next()` on it to obtain values:
```typescript {monaco-run} {showOutputAt:'+1'}
const naturals = {
  current: 0,
  next() {
    return { done: false, value: this.current++ };
  }
}

console.log(naturals.next());
console.log(naturals.next());
console.log(naturals.next());
```

---

# Using an <code>Iterator</code> in a for-of loop...
<v-switch>
<template #1>
...is not possible...
```typescript {8} twoslash
const naturals = {
  current: 0,
  next() {
    return { done: false, value: this.current++ };
  },
}

for (const n of naturals) {
  if (n >= 5) {
    break;
  }
  console.log(n)
}
```
</template>
<template #2>
...because an <code>Iterable</code> is required, let's fix it:
```typescript {monaco-run}
const naturals = {
  current: 0,
  next() {
    return { done: false, value: this.current++ };
  },
}

for (const n of naturals) {
  if (n >= 5) {
    break;
  }
  console.log(n)
}
```
</template>
</v-switch>

---

# Why <code>Iterator</code>?
<br />

<v-clicks>

- Introduced alongside `Map`, `Set`, `for..of` loop & `Symbol`
- Goal: write iteration code that can work on any data structure

</v-clicks>

<br/>

<v-click>
Supported by all runtimes since mid-2015.
</v-click>

---
transition: slide-up
---

# There's an easier way to define iterable iterators: generator functions!
````md magic-move
```typescript
const naturals = {
  current: 0,
  next() {
    return { done: false, value: current++ };
  },
  [Symbol.iterator]() {
    return this;
  }
}
```
```typescript
function* naturals() {
  let current = 0;
  while (true) {
    yield current++;
  }
}
```
````

---

# You can destructure an <code>Iterable</code>

You can destructure an <code>Iterable</code>:
```ts {monaco-run} {showOutputAt:'+1'}
function* naturals() {
  let current = 0;
  while (true) {
    yield current++;
  }
}

const [a, b, c] = naturals();
console.log(a, b, c);
```

---

# You can also spread an <code>Iterable</code>

You can spread an <code>Iterable</code>:
```ts {monaco-run} {showOutputAt:'0'}
function* upTo5() {
  let current = 0;
  while (current <= 5) {
    yield current++;
  }
}

console.log(...upTo5());
```
<v-click at="+2">Beware that spreading an infinite iterator will never complete!</v-click>

---

# Obligatory fibonacci implementation using generator functions

```ts {monaco-run}
function* fibonacci() {
  let current = 0;
  let next = 1;
  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}

console.log(...fibonacci().take(10));
```

---

# Generators don't just offer next()

<v-switch>
<template #1>
<code>return</code> for cleanup and dispose. Once called, the iterator will always be done.
```typescript {monaco-run} {autorun:false}
function* naturals() {
  let current = 0;
  while (true) {
    yield current++;
  }
  return 42;
}

const it = naturals();
console.log(it.return(3));
console.log(it.next());
```
</template>

<template #2>
<code>throw</code> to make it error
```typescript {monaco-run} {autorun:false}
function* naturals() {
  let current = 0;
  while (true) {
    yield current++;
  }
}

console.log(naturals().throw(new Error('boom')));
```
</template>

<template #3>
Any <code>Iterator</code> can implement these optional methods too:
```typescript {monaco-run} {autorun:false}
const answer: Iterator<number> = {
  next() {
    return { done: false, value: 42 };
  },
  return(value: number) {
    return { done: true, value };
  },
  throw(error: unknown) {
    throw error;
  }
}

console.log(answer.next());
console.log(answer.return?.(3));
console.log(answer.throw?.(new Error('kaboom')));
```
</template>
</v-switch>

---

# Iterator helpers

New methods exposed on all sync iterators.

<v-click>
Available as baseline newly available.

![](/baseline-2025.png)
</v-click>
<v-clicks>

* 20/02/2024 [Chromium 122](https://developer.chrome.com/blog/chrome-122-beta?hl=en#iterator_helpers)
* 28/03/2024 [Deno 1.42](https://deno.com/blog/v1.42#v8-123-and-typescript-543)
* 24/04/2024 [Node.js 22](https://nodejs.org/en/blog/announcements/v22-release-announce#v8-update-to-124)
* 01/10/2024 [Firefox 131](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/131#javascript)
* 18/10/2024 [Bun 1.1.31](https://bun.com/blog/bun-v1.1.31#iterator-helpers)
* 31/03/2025 [Safari 18.4](https://webkit.org/blog/16574/webkit-features-in-safari-18-4/#javascript)

</v-clicks>

---
layout: two-cols-header
layoutClass: gap-16
---

# Iterator helpers

```typescript {none|1}
Iterator.from(object)
```
<v-click>Returns an iterator by calling [Symbol.iterator]() on the object.</v-click>

::left::
## Lazy methods
```typescript {none|1|1-2|1-3|1-4|all}
map(mapper: (value: T) => U)
filter(predicate: (value: T) => boolean)
take(limit: number)
drop(limit: number)
flatMap(mapper: (value: T) => Iterator<U>)
```
<v-click>These methods will only execute their function argument when a value is pulled from the iterator. They all return an iterator when called.</v-click>

::right::
## Final methods
```typescript {none|1|1-2|1-3|1-4|1-5|all}
reduce<T, U>(reducer: (acc: U, value: T) => U, init?: U): U
toArray(): T[]
forEach(consumer: (value: T) => void): void
some(predicate: (value: T) => boolean): boolean
every(predicate: (value: T) => boolean): boolean
find(predicate: (value: T) => boolean): T | undefined
```
<v-click>These methods will consume the iterator and return a value that is usually not an iterator.</v-click>

---
layout: two-cols-header
layoutClass: gap-16
---

# Comparing iterating on an <code>Array</code>

::left::

With <code>Array</code> methods
```typescript {monaco-run}
const array = [1,2,3,4,5,6,7,8,9,10];
const res = array.map(x => 2*x)
        .filter(x => x % 3 !== 0)
        .map(x => 5*x)
        .flatMap(x => [x - 1, x]);
console.log(...res)
```
<v-click>Every method call will iterate on the array and return a new array.</v-click>

::right::

With Iterator helpers
```js {monaco-run}
const array = [1,2,3,4,5,6,7,8,9,10];
const res = array.values()
     .map(x => 2*x)
     .filter(x => x % 3 !== 0)
     .map(x => 5*x)
     .flatMap(function* gen(x) { yield x - 1; yield x; });
console.log(...res);
```
<v-click>Only one loop, it only happens on the last line and no memory allocation!</v-click>

---

# Iterator helpers are nice but we can do more

```typescript {monaco-run}
function* naturals() { let current = 0; while (true) { yield current++ } }

function* zipMap<T1, T2, U>(mapper: (a: T1, b: T2) => U, it1: Iterator<T1>, it2: Iterator<T2>) {
  while (true) {
    const cur1 = it1.next();
    const cur2 = it2.next();
    if (cur1.done || cur2.done) { return; }
    yield mapper(cur1.value, cur2.value);
  }
}

console.log(...zipMap((a, b) => `${a} is before ${b}`, naturals().take(5), naturals().drop(1)));
```

---

# Let's write a chunking function

<v-switch>
<template #1>
```typescript {monaco-run} {autorun:false}
function* naturals() { let current = 0; while (true) { yield current++ } }

function* chunks<T>(iterable: Iterable<T>, size: number) {
  const iterator = Iterator.from(iterable);
  
  while (true) {
    yield iterator.take(size);
  }
}

console.log(...chunks(naturals(), 3).map(it => it.toArray()).take(5));
```
</template>
<template #2>
```typescript {monaco-run} {autorun:false}
function* naturals() { let current = 0; while (true) { yield current++ } }

function* chunks<T>(iterable: Iterable<T>, size: number) {
  const iterator = Iterator.from(iterable);
  
  while (true) {
    yield chunked(iterator, size);
  }
}

function* chunked<T>(iterator: Iterator<T>, size: number) {
  for (let i = 0; i < size; i++) {
    const { done, value } = iterator.next();
    if (done) { return }
    yield value;
  }
}

console.log(...chunks(naturals().take(15), 3).map(it => it.toArray()).take(10));
```
</template>
<template #3>
```typescript {monaco-run} {autorun:false}
function* naturals() { let current = 0; while (true) { yield current++ } }

function* chunks<T>(iterable: Iterable<T>, size: number) {
  const iterator = Iterator.from(iterable);
  
  while (true) {
    const { value, done } = iterator.next();
    if (done) { return; }
    yield chunked(iterator, value, size - 1)
  }
}

function* chunked<T>(iterator: Iterator<T>, value: T, size: number) {
  yield value;
  for (let i = 0; i < size; i++) {
    const { done, value } = iterator.next();
    if (done) { return }
    yield value;
  }
}

console.log(...chunks(naturals().take(15), 3).map(it => it.toArray()).take(10));
```
</template>
<template #4>
Thankfully, there's an EcmaScript proposal to do exactly that!

https://github.com/tc39/proposal-iterator-chunking

It's currently in stage 2, which means it's not gonna be available for quite a while though.
</template>
</v-switch>

---

# <code>Iterator</code>s are trickier than they look

<v-clicks>

- No way to differentiate between finish and empty
- No way to know if the iterator is finished without consuming a value
- <code>take</code> & <code>drop</code> will close the underlying iterator
- No built-in cloning feature to alleviate closing (and you don't want to try to implement it yourself)
- Beware of infinite loops!

</v-clicks>

---

# It gets trickier with `AsyncIterator`s

```ts {monaco-run}
async function* slowNaturals() {
  let current = 1;
  while (true) {
    const { promise, resolve } = Promise.withResolvers<number>()
    setTimeout(() => resolve(current++), 1000);
    yield promise;
  }
}

for await (const n of slowNaturals()) {
  console.log(n);
  if (n >= 5) break;
}
```

---

# More info on <code>AsyncIterator</code>s
<br />

<v-clicks>

An `AsyncIterator` is basically an `Iterator` that returns `Promise`s.

It's pretty great to work with I/O (`fs.createReadStream`, paging APIs).

You can only:
</v-clicks>

<v-clicks>

- call its `next` method
- use in a `for await..of` loop
- pass it to `Array.fromAsync` (supported everywhere since 2024)

</v-clicks>

<br/>
<v-click>
And that's all for now until the async-iterator-helpers proposal progresses:

https://github.com/tc39/proposal-async-iterator-helpers
</v-click>

---

# More info

- [Iterator on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)
- TC39 Iterator related proposals
  - Stage 3:
    - [Sequencing](https://github.com/tc39/proposal-iterator-sequencing)
  - Stage 2:
    - [Chunking](https://github.com/tc39/proposal-iterator-chunking) (Iterator#chunks & Iterator#windows)
    - [`Iterator.range`](https://github.com/tc39/proposal-iterator.range)
    - [Async Iterator helpers](https://github.com/tc39/proposal-async-iterator-helpers)

<PoweredBySlidev mt-10 />

---
layout: image-right
image: https://cover.sli.dev
---

# Questions