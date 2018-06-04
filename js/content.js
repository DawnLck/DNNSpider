/* Content.js 匹配页面注入代码
* */

/* 标记所有文本节点 */
function markAllContentDom() {
    console.log('Mark all content dom ...');
    let bodyWidth = $('body').width();
    console.log('bodyWidth' + bodyWidth);
    let allDiv = $('div');
    allDiv.each(function () {
        if ($(this).width() / bodyWidth * 100.0 < 30 || $(this).width() / bodyWidth * 100.0 > 90) {
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
        if ($(this).find('.marked').length > 0) {
            console.log('找到容器元素!');
            $(this).removeClass('spider marked');
        }
    })
}

/* 取消所有节点的标记 */
function markUndo(){
    console.log('取消所有节点的标记...');
    $('.spider').removeClass('spider');
}

function pageClassifiy(){
    console.log('... 网页分类 ...');
}

/* 标记所有锚结点 */
function markAllLinkDom() {
}

function calculateWeights(count, text){
    if(!text){
        return 0;
    }
    var queue = ['bbs', 'articles', 'news'];
    for (var _index = 0; _index < queue.length; _index++) {
        var _tem = GLOBAL[queue[_index]];
        for (var j = 0; j < _tem.primaryKeys.length; j++) {
            if (text.indexOf(_tem.primaryKeys[j]) > -1) {
                count[queue[_index]] += 2;
            }
        }
        for (var x = 0; x < _tem.secondKeys.length; x++) {
            if (text.indexOf(_tem.secondKeys[x]) > -1) {
                count[queue[_index]] += 1;
            }
        }
    }
    return count;
}

function getLocationHref(){
    console.log('Get Location Href ... ');
    var location = window.location.href;
    console.log(location);
    var title = document.title;
    var keywords = $('meta[name="keywords"]').attr('content');
    var description = $('meta[name="description"]').attr('content') || $('meta[name="Description"]').attr('content');
    var result = {
        bbs: 0,
        articles: 0,
        news: 0
    };
    console.log(title);
    console.log(keywords);
    console.log(description);
    result = calculateWeights(result, title);
    result = calculateWeights(result, keywords);
    result = calculateWeights(result, description);
    console.log(result);
}

$(document).ready(function () {
        $('body').css('background-color', '#C7EDCC');
    }
);


function contentInit() {
    // setTimeout(function () {
    //     markAllContentDom();
    //     markAllLinkDom();
    // }, 1000);
}

let text = "hello";
chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        console.log('RunTime .... ');
        switch (message.type) {
            case "getText":
                sendResponse(text);
                break;
            case "markContent":
                markAllContentDom();
                // getLocationHref();
                sendResponse('Mark Done!');
                break;
            case "markUndo":
                markUndo();
                sendResponse('UndoMark Done!');
                break;
            default:
                sendResponse('Nothing!');
                break;
        }
    }
);

function init() {
    // contentInit();
    getLocationHref();
}

init();
