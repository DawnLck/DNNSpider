/* background.js 在后台运行的脚本程序
* */

// 运行content.js（页面级注入脚本）
// chrome.browserAction.onClicked.addListener(function(tab) {
//     chrome.tabs.executeScript(tab.id, {file: 'jquery.min.js'});
//     chrome.tabs.executeScript(tab.id, {file: 'content.js'});
// });


// if (jQuery) {
//     // jQuery loaded
//     alert('jQuery loaded');
// } else {
//     // jQuery not loaded
//     alert('jQuery not loaded');
// }

// 切换颜色
function switchColor(color) {
    // alert('color:' + color);
    // $('body').css('background-color', color);
    chrome.tabs.executeScript(null, {code: 'document.body.style.backgroundColor="' + color + '"'});
    // return color;
}


