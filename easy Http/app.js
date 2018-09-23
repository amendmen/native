const http = new easyHTTP;

//GET
// http.get('https://jsonplaceholder.typicode.com/posts', function(err, posts) {
//     if(err) {
//         console.log(err)
//     } else {
//     console.log(posts)
//     }
// });
//GET single post
// `http.get('https://jsonplaceholder.typicode.com/posts/1', function(err, posts) {
//     if(err) {
//         console.log(err)
//     } else {
//     console.log(posts)
//     }
// });`

//create data 
const data = {
    title: 'Custom title',
    body: 'This is body'
}

//POST
// http.post('https://jsonplaceholder.typicode.com/posts', data, function(err, post) {
//     if(err) {
//         console.log(err)
//     } else {
//          console.log(post)
//     }
// });
//Update post PUT.
// http.put('https://jsonplaceholder.typicode.com/posts/5', data, function(err, post) {
//     if(err) {
//         console.log(err)
//     } else {
//          console.log(post)
//     }
// });

//DELTE
http.delete('https://jsonplaceholder.typicode.com/posts/1', function(err, response) {
    if(err) {
        console.log(err)
    } else {
    console.log(response)
    }
});