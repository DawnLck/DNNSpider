/* Popup.js 点击扩展图标的事件
* */

console.log('My Crx');

function init() {
    // 从background获取js接口
    var module = chrome.extension.getBackgroundPage();
    var colorEle = document.getElementById('blue');
    colorEle.onclick = function () {
        console.log('Hello World');
    };
    var list = ['red', 'blue', 'green'];
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        $('#' + item).click(function (item) {
            console.log(item);
            var val = $(this).attr('id');
            module.switchColor(val);
        })
    }
    // $('#red').click(function () {
    //     console.log('Red');
    //     // window.close();
    //     module.switchColor('red');
    //     // $('body').css('background-color', 'red');
    // });
}

document.addEventListener('DOMContentLoaded', init)