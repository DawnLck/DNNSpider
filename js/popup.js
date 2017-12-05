// function click(color) {
//     chrome.tabs.executeScript(null,
//         {code: "document.body.style.backgroundColor='" + color.id + "'"});
//     window.close();
// }

var colorEle = document.getElementById('blue');
colorEle.onclick = function () {
    console.log('Hello World');
};
$('#red').click(function () {
    console.log('Red');
    chrome.tabs.executeScript(null, {code: "document.body.style.backgroundColor=red"});
    // window.close();
    $('body').css('background-color', 'red');
});
console.log('My Crx');