let re;
//Literal characters
re = /hello/

//Metacharacter symbols
re =/^h/ // must start with
re =/World$/i // must ends with
re =/^hello$/i /// must begin end end with
re =/h.llo/i // matches any ONE character
re =/h*llo/i // matches any character 0 or more
re = /gre?a?y/ // optinal character
re = /gre?a?y\?/ // escape character



// Brackets [] - character sets
re = /gr[ae]y/i // must be an a or e
re = /[GR]ray/ // must be a G or R
re = /[^GR]ray/ // match anything exept a G or R
re = /[A-Z]ray/ // any uppercase letter
re = /[a-z]ray/ // any lowercase letter
re = /[A-Za-z]ray/ // match any letter
re = /[0-9]ray/ // match any digit

//braces {} - Quantifiers
re = /Hel{2}o/i; //must occur exactly {m} amount of times
re = /Hel{2,4}o/i; //must occur exactly {m} amount of times 2=< m <=4
re = /Hel{2,}o/i; //must occur at least {m} of times


//parenthese () - grouping
re = /([0-9]x){3}/

//shorthand character classes
re = /\w/ // word character - alphanumeric or _
re = /\w+/ // + = one or more
re = /\W/ // Non-word characters
re = /\d/ // any digit
re = /\d+/ // match any digit + or more times
re = /\D/ //match any non-digit 
re = /\s/ //match whitespace char 
re = /\S/ //match non-whitespace char 
re = /Hell\b/i // word boundary

// Assertions
re = /x(?=y)/ // match x only if it followed by y
re = /x(?!y)/ // match x only if NOT followed by y


//string to match
const str = 'xsy';
//const  str = 'gray'
//lo
const result = re.exec(str)
console.log(result);


function reTest(re,str) {
    if(re.test(str)){
        console.log(`${str} matched ${re.source}`)
    } else {
        console.log(`${str} does not matched ${re.source}`)
    }
}

reTest(re, str)