/* 
1 -> 6 -> 5 -> 3 -> 4 -> 2
*/

console.log("1:async");

setTimeout(() => console.log("2: setTimeout"),  0);

Promise.resolve().then(() => console.log("3: promise.then"));

queueMicrotask(()=> console.log("4: queueMicrotask"));

process.nextTick(() => console.log("5: nexttick"));

console.log("6: async");