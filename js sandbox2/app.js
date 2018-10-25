// const sayHello = function() {
//     console.log('Heloo')
// }

// const sayHeloo = () => {
//     console.log('Hello')
// }

// One line function does not need braces
// const sayHello = () => console.log('hello')

//one linre returns
//const sayHello = () => 'hello'

//same as above
//const sayHello = function() {
// return'Hello'
//}

//Return object
//const sayHello = () => ({ msg: 'Hello'});

//Single parametr does not need parenthesis
//const sayHello = name => console.log(`Hello ${name}`)

//Multiple parametrs need parenthesis
//const sayHello = (firstName, lastName) => console.log(`Hello ${name}`)

const users = ['Nathan', 'John', 'William'];

// const nameLength = users.map(function(name){
//     return name.length;
// })

const nameLength = users.map(name => name.length);

