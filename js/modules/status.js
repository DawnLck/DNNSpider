function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            callback(true);
        }
    };
    xhr.onerror = function(){
        callback(false);
    };
    xhr.send();
}

// setInterval(function(){
//     httpRequest('https://www.google.com/', function(status){
//         chrome.browserAction.setIcon({path: 'assets/icon/'+(status?'robot_48x48.png':'code_48x48.png')});
//     });
// },5000);
