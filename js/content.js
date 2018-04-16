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
    let allDiv = $('div');
    allDiv.each(function () {
        // console.log($(this).width());
        if ($(this).width() < 400 || $(this).width() > 1000) {
            // console.log('非目标元素');
            $(this).addClass('spider unmarked');
            // $(this).css('background-color', 'grey');
            // $(this).css('border', 'red solid 2px');
        }
        else {
            $(this).addClass('spider marked');
            // console.log('找到目标元素：' + $(this).text());
            // $(this).css('background-color', 'green');
            // $(this).css('border', 'blue solid 2px');
        }
    });

    console.log('寻找容器元素 ...');

    $('div.marked').each(function () {
        if ($(this).find('marked').length > 0) {
            console.log('找到容器元素!');
            $(this).removeClass('spider marked');
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

let text = "hello";
chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        switch (message.type) {
            case "getText":
                sendResponse(text);
                break;
            case "frameContent":
                markAllContentDom();
                break;
            default:
                break;
        }
    }
);

function init() {
    // contentInit();
}

init();
