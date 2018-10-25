const user = {email: 'zxzx@dasd.com'}

try{
    //produce a ReferenceError
    //myFunction();

    //TypeError
    //null.myFunction();

    //SyntaxError
    //eval('"Hello world"')

    //URIError
    //decodeURIComponent('%');

    if(!user.name){
        //throw 'User has no name'
        throw new SyntaxError('User has no name')
    }
} catch(e) {
    console.log(`User error: ${e.message}`)
    //console.log(e);
    // console.log(emessage);
    // console.log(e.name);
    // console.log(e instanceof TypeError);
} finally {
    console.log('Finally runs reguardless of result..')
}