let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // console.log(methodType + " State Changed Called at: " + showTime() + "Ready State: " +
            //     xhr.readyState + " Status:" + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handle 400 Client Error or 500 Server Error Error at: " + showTime());
                }
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " request sent to the server at: " + showTime());
    });
}

const getURL = "http://127.0.0.1:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data: " + showTime() + " data: " + responseText);
    })
    .catch(error => console.log("GET Error Status: " + JSON.stringify(error)));
console.log("Made GET AJAX Call to Server at " + showTime());


const deleteURL = "http://127.0.0.1:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Delete at: " + showTime() + " data:" + responseText);
    })
    .catch(error => console.log('Delete Error Status: ' + JSON.stringify(error)))
console.log("Made DELETE AJAX Call to Server at " + showTime());

const postURL = "http://127.0.0.1:3000/employees";
const emplData = { "name": "Harry", "salary": "5000" };
makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
        console.log("User Added at: " + showTime() + " data:" + responseText);
    })
    .catch(error => console.log('Added Error Status: ' + JSON.stringify(error)))
console.log("Made POST AJAX Call to Server at " + showTime());