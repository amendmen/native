// //create sybol
// const sym1 = Symbol();
// const sym2 = Symbol('symb2');

//console.log(typeof sym2);

// console.log(Symbol('123') === Symbol('123'));
// console.log(`Hello ${sym1.toString()}`)

//Unique Object key

const KEY1 = Symbol();
const KEY2 = Symbol('sym2');

const myObj = {};
myObj[KEY1] = 'prop1';
myObj[KEY2] = 'prop2';
myObj.key3 = 'prop3'
myObj.key4 = 'prop4'

// console.log(myObj[KEY1])
// console.log(myObj[KEY2])

// // Symbol are not enumerable in f0r..in
// for(let i in myObj) {
//     console.log(`${i}: ${myObj[i]}`)
// }

//Sybols are ignored by JSON.strigify
console.log(JSON.stringify({key: 'prop'}))
console.log(JSON.stringify({[Symbol('sym1')]: 'prop'}))