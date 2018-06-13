/* Popup.js 点击扩展图标的事件
* */

console.log('My Crx');

/* 切换背景颜色函数 */
function switchColorInit() {
    let list = ['red', 'blue', 'green'];
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        $('#' + item).click(function (item) {
            console.log(item);
            let idVal = $(this).attr('id');
            console.log(idVal);
            modules.switchColor(idVal);
        })
    }
}

function sendMessage() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "getText"}, function (response) {
            console.log(response);
            $("#text").text(response);
        });
    });
}

function transportMessage(msg) {
    console.log('Transport Message ... ');
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: msg}, function (response) {
            console.log(response);
        });
    });
}

function init() {
    // 从background获取js接口
    let modules = chrome.extension.getBackgroundPage();
    $('#spider-main').click(function () {
        console.log('Spider: Mark main');
        transportMessage('markMainArea');
    });
    $('#spider-mark').click(function () {
        console.log('Spider mark');
        transportMessage('markContent');
    });
    $('#spider-markUndo').click(function () {
        transportMessage('markUndo');
    });
    // console.log(modules.switchColor('red'));
    // let colorEle = document.getElementById('blue');
    // colorEle.onclick = function () {
    //     console.log('Hello World');
    // };

    // sendMessage();
}

document.addEventListener('DOMContentLoaded', init);