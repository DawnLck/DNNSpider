/* Popup.js 点击扩展图标的事件
* */

console.log('My Crx');

/* 切换背景颜色函数 */
function switchColorInit(){
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

function init() {
    // 从background获取js接口
    let modules = chrome.extension.getBackgroundPage();
    // console.log(modules.switchColor('red'));
    let colorEle = document.getElementById('blue');
    colorEle.onclick = function () {
        console.log('Hello World');
    };
}

document.addEventListener('DOMContentLoaded', init);