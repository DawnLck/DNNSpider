/* Content.js 匹配页面注入代码
* */
if (jQuery) {
    // jQuery loaded
    console.log('jQuery loaded');
} else {
    // jQuery not loaded
    console.log('jQuery not loaded');
}
// setTimeout(function () {
//     console.log($('body').css('background-color'));
//     $('body').css('background-color','grey');
// }, 1000);

/* 标记所有文本节点 */
function markAllContentDom() {
    console.log('Mark all content dom ...');
    $('div').each(function () {
        console.log($(this).width());
        if ($(this).width() < 400 || $(this).width() > 1000) {
            $(this).css('background-color', 'grey');
            $(this).css('border', 'red solid 2px');
        }
        else {
            console.log('找到目标元素：' + $(this).text());
            $(this).css('background-color', 'green');
            $(this).css('border', 'blue solid 2px');
        }
    })
}

/* 标记所有锚节点 */
function markAllLinkDom() {
}

$(document).ready(function () {
        $('body').css('background-color', '#C7EDCC');
    }
);


function contentInit() {
    setTimeout(function () {
        markAllContentDom();
        markAllLinkDom();
    }, 1000);
}

var text = "hello";
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "getText":
                sendResponse(text);
                break;
        }
    }
);

function init() {
    // contentInit();
}
init();
