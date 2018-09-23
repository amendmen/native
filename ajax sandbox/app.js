document.getElementById('button').addEventListener('click', loadData)

function loadData() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'data.txt', true)

    // Optional - used for spinners/loaders
    xhr.onprogress = function() {
        console.log('READYSTATE', xhr.readyState)
    }

    xhr.onload = function() {
        console.log('READYSTATE', xhr.readyState)
        if(this.status === 200) {
            console.log(this.responseText)
            document.getElementById('output').innerHTML =  `<h1>${this.responseText}</h1>`;
        }
    }

    // xhr.onreadystatechange =function() {
    //     if(this.status === 200 && this.readyState === 4) {
    //         console.log(this.responseText)
    //     }
    // }

    xhr.onerror = function() {
        // console.log('request error....S')
    }

    xhr.send();

    // readyState Values
    // 0: requesrt not initialized
    // 1: server connection established
    // 2: request received
    // 3: processing request
    // 4: request finished and response is ready
}