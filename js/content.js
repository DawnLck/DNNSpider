/* Content.js 匹配页面注入代码
* */

let collectDom = function () {
    console.log('Collect Dom ....');
};

/* 标记主要区域 */
function markMainArea(callback) {
    console.log('Mark main area ... ');
    let _body = document.getElementsByTagName('body')[0],
        bodyWidth = _body.scrollWidth,
        bodyHeight = _body.scrollHeight,
        bodyTextLength = _body.innerText.length,
        allDiv = $('div');

    console.log('Body { width:' + bodyWidth + ' height: ' + bodyHeight + ' }');

    //标记
    allDiv.each(function () {
        let _width = $(this).width() / bodyWidth * 100.0;
        let _height = $(this).height() / bodyHeight * 100;
        let _text = $(this).text();
        let _textDensity = _text.length / bodyTextLength.length * 100;


        if (_text) {
            if (_width > 30 && _width < 96) {
                $(this).addClass('spider');
                if (_height > 60) {
                    $(this).addClass('main');
                }
            }
        }
    });

    $('div.spider.main').each(function () {
        if ($(this).find('.spider.main').length > 0) {
            console.log('Unmark the main ... ');
            $(this).removeClass('main');
        }
    });
    callback();
}

/* 标记帖子区域 */
function markPostArea(callback) {
    console.log('Mark post area ... ');

    let mainSelector = $('div.spider.main');
    let mainWidth = mainSelector.width(),
        mainHeight = mainSelector.height();
    console.log(mainWidth + ' ' + mainHeight);

    mainSelector.parent().find('div.spider').each(function () {
        if ($(this).width() / mainWidth * 100 > 70 && $(this).height() / mainHeight * 100 > 50) {
            $(this).addClass('post');
        }
    });

    $('div.post').each(function () {
        if ($(this).find('.spider.post').length > 0) {
            console.log('Unmark the post ... ');
            $(this).removeClass('post');
        }
    });

    callback();
}

/* 标记列表节点 */
function markListNode() {
    console.log('Mark list node ... ');
    let result = [];

    $('div.post').children().each(function () {
        // $(this).append('<div class="collect-btn">采集</div>');
        $(this).addClass('spider listNode');
        let links = [];
        $(this).find('a').each(function () {
            // console.log($(this).text());
            if ($(this).prop('childElementCount') === 0 && $(this).text().length > 0 && $(this).attr('href') && $(this).attr('href').length > 20) {
                // console.log('Author ... ' + $(this).text() + $(this).attr('href'));
                links.push({
                    url: $(this).attr('href'),
                    text: $(this).text(),
                    width: $(this).width(),
                    height: $(this).height(),
                    offsetLeft: $(this).prop('offsetLeft'),
                    offsetTop: $(this).prop('offsetTop')
                })
            }
        });
        // console.log(links);

        result.push({
            text: $(this).text().replace(/(\s){2}|('\n')|('\r')/g, ''),
            author: $(this).find('a').attr('href'),
            links: links
        });
    });

    console.log(result);
}

/* 标记所有文本节点 */
function markAllContentDom() {
    console.log('Mark all content dom ...');

    //标记叶子节点以及初步筛选
    function markLeafNode(callback) {
        console.log('Mark Leaf Node ... ');
        let mainDom = $('.spider.main'),
            mainWidth = mainDom.width();

        //标记
        mainDom.find('div').each(function () {
            let _width = $(this).width() / mainWidth * 100.0;
            let _height = $(this).height();
            let _text = $(this).text();

            console.log('_width: ' + _width);
            console.log('_height: ' + _height);
            console.log('_text: ' + _text + ' \n');

            if (_text) {
                if (_width > 30 && _width < 96 && _text.length > 0 && _height > 3) {
                    $(this).addClass('spider leaf');
                }
                else {
                    $(this).addClass('spider unmarked');
                }
            }
        });

        //筛选
        $('div.spider.leaf').each(function () {
            if ($(this).find('.leaf').length > 0) {
                $(this).removeClass('leaf');
            }
        });

        callback();
    }

    //标记那些可能是列表的节点
    function markListNode() {
        console.log('Mark List Node ...');
        // let childrenNum = $(this).children().length;
        // let nextNum = $(this).siblings().length + 1;
        //
        // if (nextNum > 3) {
        //     $(this).addClass('spider leaf');
        //     console.log('Children Num: ' + childrenNum);
        //     console.log('Next Num: ' + nextNum);
        //     console.log($(this).text());
        // }

        $('div.leaf').each(function () {
            console.log($(this).text());
            let _parent = $(this).parent();
            console.log(_parent.children('.leaf').length);
            //listNode节点所包含的叶子节点数必须大于等于两个
            if (_parent.children('.leaf').length >= 2) {
                console.log(_parent.text());
                console.log(_parent.children('.leaf').length);
                _parent.addClass('listNode marked');

                if (_parent.find('.collect-btn').length > 0) {
                } else {
                    _parent.append(
                        '<div class="collect-btn">采集</div>'
                    );
                }
            } else {
            }
        });
    }

    markLeafNode(function () {
        markListNode();
    });


    $('.collect-btn').click(function () {
        console.log(this);
        console.log($(this).width());
        console.log($(this).parent('.marked').text());
        collectDom();
    });
}

/* 取消所有节点的标记 */
function markUndo() {
    console.log('取消所有节点的标记...');
    $('.spider').removeClass('spider');
}

/* 网页分类计算权重 */
function calculateWeights(count, text) {
    if (!text) {
        return count;
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

function pageClassify(display) {
    console.log('... 网页分类 ...');

    // console.log('Get Location Href ... ');
    // var location = window.location.href;
    // console.log(location);

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

    if ((result.bbs + result.articles + result.news) === 0) {
        // console.log('基于内容进行第二次网页分类 ... ');
        console.log('The second classify based on content ... ');

        result = calculateWeights(result, $('body').text());
    }

    var category = 'bbs';
    var tem = result.bbs;
    if(result.bbs < result.articles){
        category = 'articles';
        tem =result.articles;
    }
    if(result.news > tem){
        category = 'news';
    }

    if (display) {
        $('body').append(
            '<div class="spider toast toast-green">' +
            // '<div class="toast-icon"></div>' +
            '<div class="toast-content">' +
            '<div class="toast-title">' + '网页类型分析' + '</div>' +
            '<div class="toast-message">' + JSON.stringify(result) + '</div>' +
            '</div>' +
            '<div class="toast-close"></div>' +
            '</div>');
    }

    return {
        title: title,
        url: window.location.href,
        category: category,
        meta_keyword: keywords,
        meta_description: description,
        score: result
    };
}

/* 保存当前页面 */
function saveCurrentPage() {
    console.log('Save the current page');
    var item = pageClassify(false);
    $.get('http://localhost:8080/data/savePage', item, function(callback){
        console.log(callback)
    })
}

/* 标记所有锚结点 */
function markAllLinkDom() {
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

function autoRefresh() {
    console.log('Auto refresh ... ');
    window.location.reload();
}

let text = "hello";
chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        console.log('RunTime .... ');
        switch (message.type ? message.type : message.message) {
            case "getText":
                sendResponse(text);
                break;
            case "markContent":
                // markMainArea(function(){
                //     markAllContentDom();
                // });

                markMainArea(function () {
                    markPostArea(function () {
                        markListNode(function () {
                            console.log('Mark content done ...');
                        })
                    })
                });

                // getLocationHref();
                sendResponse('Mark Done!');
                break;
            case "markUndo":
                markUndo();
                sendResponse('UndoMark Done!');
                break;
            case "markMainArea":
                markMainArea(function () {
                    return true;
                });
                sendResponse('Mark Main-Area Done!');
                break;
            case "autoRefresh":
                autoRefresh();
                sendResponse('Auto Refresh ... ');
                break;
            case "savePage":
                saveCurrentPage();
                break;
            default:
                sendResponse('Nothing!');
                break;
        }
    }
);

function init() {
    // contentInit();
    // markMainArea();
    // pageClassify();
}

// $('.collect-btn').click(function () {
//         console.log('Click');
//         collectDom();
//     }
// );

init();
