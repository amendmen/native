let re;

re = /hello/;
re = /hello/i; // i = case insensetive
// re = /hello/g; // global search

// console.log(re)
// console.log(re.source)

// exec() - return result in an array or null
// const result = re.exec('hello world');

// console.log(result)
// console.log(result[0])
// console.log(result.index)
// console.log(result.input) 

// test() - returns true or false

// const result = re.test('Hello');
// console.log(result)

// match() - retur result array or null
// const str = 'Hello There';
// const result = str.match(re)
// console.log(result)

// search() - returns index of the first match if not found returns -1
// const str = ' Hello There';
// const result = str.search(re)
// console.log(result)

//replace() - return new string with some or all matches of pattern
const str = 'Hello There';
const result = str.replace(re, 'Hi')
console.log(result)