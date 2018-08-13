/* Content.js 匹配页面注入代码
* */

let collectDom = function () {
    console.log('Collect Dom ....');
};
const rootFontSize = parseInt(window.getComputedStyle(document.getElementsByTagName('body')[0]).fontSize);

/* 标记主要区域 */
function markMainArea(callback) {
    Timer.start("mainMark");
    console.log('Mark main area ... ');
    let _body = document.getElementsByTagName('body')[0],
        bodyWidth = _body.scrollWidth,
        bodyHeight = _body.scrollHeight,
        // bodyTextLength = _body.innerText.length,
        // rootFontSize = parseInt(window.getComputedStyle(_body).fontSize),
        allDiv = $('div');

    console.log('Body { width:' + bodyWidth + ' height: ' + bodyHeight + ' }');
    console.log('Body Font-size: ' + rootFontSize);

    //标记
    allDiv.each(function () {
        let _width = $(this).width() / bodyWidth * 100.0;
        let _height = $(this).height() / bodyHeight * 100;
        let _text = $(this).text().length;
        // let _textDensity = _text.length / bodyTextLength.length * 100;

        if (_text && _width > 30 && _width < 96) {
            if (_height > 60) {
                $(this).addClass('spider spider-main');
            } else if ($(this).height() > rootFontSize) {
                $(this).addClass('spider');
                // console.log('## Spider: ' + $(this).height() + ' ' + $(this).text());
            } else {
                // console.log('## Non-Spider: ' + $(this).height() + ' ' + $(this).text());
                // console.log('Remove: ' + $(this).height());
                // $(this).removeClass('spider');
            }
        }

        _width = null;
        _height = null;
        _text = null;
        // _textDensity = null;
    });

    //
    // function filterMain(node) {
    //     node.children().each(function () {
    //         let _self = $(this);
    //         if(_self.hasClass('spider-main')){
    //             filterMain(_self);
    //             let _parent = _self.parent();
    //             if(_self.width() * 1.1 > _parent.width()){
    //                 _self.removeClass('spider-main');
    //             }else{
    //                 _parent.removeClass('spider-main');
    //             }
    //         }
    //     });
    // }
    // filterMain($('body'));

// test

    $('div.spider-main').each(function () {
        let _self = $(this);
        let _parent = _self.parent();
        if (_self.width() * 1.1 > _parent.width()) {
            _self.removeClass('spider-main');
        }
    });

    $('div.spider-main').each(function () {
        if ($(this).find('.spider-main').length > 0) {
            $(this).removeClass('spider-main');
        }
    });

    $('.spider-main').siblings().each(function () {
        $(this).addClass('spider-nonMain');
        // console.log('Area Siblings ... ');
    });

    Timer.stop("mainMark");
    console.log("The main Mark time is: " + Timer.getTime('mainMark'));

    callback();
}

/* 标记帖子区域 */
function markPostArea(callback) {
    Timer.start("markPost");
    console.log('Mark post area ... ');

    let mainSelector = $('.spider-main');
    let mainWidth = mainSelector.width(),
        mainHeight = mainSelector.height();
    // console.log(mainWidth + ' ' + mainHeight);

    mainSelector.addClass('spider-content');

    function markContentNode(self) {
        self.children().each(function () {
            let _self = $(this),
                _height = _self.height();
            if (_self.width() / mainWidth * 100 > 70 && _height > rootFontSize) {
                _self.addClass('spider spider-content');
                // console.log('Mark Content Node ...');
                if (_height / mainHeight * 100 > 50 && _self.children().length > 6) {
                    _self.addClass('spider-post');
                }
            }
            markContentNode(_self);
        })
    }

    markContentNode(mainSelector);

    // mainSelector.parent().find('.spider-content').each(function () {
    //     let _self = $(this);
    //     if (_self.height() / mainHeight * 100 > 50) {
    //         let _childrenLength = _self.children().length;
    //         if (_childrenLength > 3) {
    //             _self.addClass('spider-post');
    //         }
    //     }
    //
    //     //
    //     // // console.log('siblings Count: ' + _siblingsLength);
    //     // if (_siblingsLength > 6) {
    //     //     $(this).parent().addClass('spider spider-post');
    //     // } else if (_self.width() / mainWidth * 100 > 70 && _self.height() / mainHeight * 100 > 50) {
    //     //     // console.log(_self.prop('childElementCount'));
    //     //     if (_self.children('.spider').length > 4) {
    //     //         $(this).addClass('spider spider-post');
    //     //     }
    //     // }
    // });

    $('.spider-post').each(function () {
        if ($(this).find('.spider-post').length > 0) {
            console.log('Unmark the post ... ');
            $(this).removeClass('spider-post');
        }
    });

    Timer.stop("markPost");
    console.log("The post mark time is: " + Timer.getTime('markPost'));

    callback();
}

/* 标记列表节点 */
function markListNode() {
    Timer.start("markList");
    console.log('Mark list node ... ');
    // let result = [];

    $('.spider-post').children('.spider-content').each(function () {
        let _self = $(this);
        _self.addClass('listNode');

        // 考虑百度贴吧的两段式布局
        _self.children().each(function () {
            let _self = $(this);
            if (_self.height() > 2 * rootFontSize && !_self.hasClass('spider')) {
                _self.addClass('spider listNode_components');
                // console.log('## Spider: ' + $(this).height() + ' ' + $(this).text());
            }
        });

        // let links = [];
        // $(this).find('a').each(function () {
        //     // console.log($(this).text());
        //     if ($(this).prop('childElementCount') === 0 && $(this).text().length > 0 && $(this).attr('href') && $(this).attr('href').length > 20) {
        //         // console.log('Author ... ' + $(this).text() + $(this).attr('href'));
        //         links.push({
        //             url: $(this).attr('href'),
        //             text: $(this).text(),
        //             width: $(this).width(),
        //             height: $(this).height(),
        //             offsetLeft: $(this).prop('offsetLeft'),
        //             offsetTop: $(this).prop('offsetTop')
        //         })
        //     }
        // });
        //
        // result.push({
        //     text: $(this).text().replace(/(\s){2}|('\n')|('\r')/g, ''),
        //     author: $(this).find('a').attr('href'),
        //     links: links
        // });
    });

    Timer.stop("markList");
    console.log("The post mark time is: " + Timer.getTime('markList'));

    // console.log(result);
}

/* 标记所有文本节点 */
function markAllContentDom() {
    console.log('Mark all content dom ...');

    //标记叶子节点以及初步筛选
    function markLeafNode(callback) {
        console.log('Mark Leaf Node ... ');
        let mainDom = $('.spider-main'),
            mainWidth = mainDom.width();

        //标记
        mainDom.find('div').each(function () {
            let _width = $(this).width() / mainWidth * 100.0;
            let _height = $(this).height();
            let _text = $(this).text();

            // console.log('_width: ' + _width);
            // console.log('_height: ' + _height);
            // console.log('_text: ' + _text + ' \n');

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
            // console.log($(this).text());
            let _parent = $(this).parent();
            // console.log(_parent.children('.leaf').length);
            //listNode节点所包含的叶子节点数必须大于等于两个
            if (_parent.children('.leaf').length >= 2) {
                // console.log(_parent.text());
                // console.log(_parent.children('.leaf').length);
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
    $('.spider .collect-showBtn').remove();
    $('.spider').removeClass('spider');
}

/* 网页分类计算权重 */
function calculateWeights(count, text, weight) {
    if (!text) {
        return count;
    }
    let queue = ['bbs', 'articles', 'news'];
    for (let _index = 0; _index < queue.length; _index++) {
        let _tem = GLOBAL[queue[_index]];
        for (let j = 0; j < _tem.primaryKeys.length; j++) {
            if (text.indexOf(_tem.primaryKeys[j]) > -1) {
                count[queue[_index]] += (2 * weight);
            }
        }
        for (let x = 0; x < _tem.secondKeys.length; x++) {
            if (text.indexOf(_tem.secondKeys[x]) > -1) {
                count[queue[_index]] += (1 * weight);
            }
        }
    }
    // console.log('######### ' + text + ' ########');
    // console.log(count);
    return count;
}

/* 网页分类 */
function pageClassify(display) {
    console.log('... 网页分类 ...');

    // console.log('Get Location Href ... ');
    // let location = window.location.href;
    // console.log(location);

    let title = document.title;
    let keywords = $('meta[name="keywords"]').attr('content');
    let description = $('meta[name="description"]').attr('content') || $('meta[name="Description"]').attr('content');
    let result = {
        bbs: 0,
        articles: 0,
        news: 0
    };
    console.log(title);
    console.log(keywords);
    console.log(description);
    result = calculateWeights(result, title, 3);
    result = calculateWeights(result, keywords, 2);
    result = calculateWeights(result, description, 1);
    console.log(result);

    if ((result.bbs + result.articles + result.news) === 0) {
        // console.log('基于内容进行第二次网页分类 ... ');
        console.log('The second classify based on content ... ');

        result = calculateWeights(result, $('body').prop('innerText'), 1);
    }

    let category = 'bbs';
    let tem = result.bbs;
    if (result.bbs < result.articles) {
        category = 'articles';
        tem = result.articles;
    }
    if (result.news > tem) {
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
        domain: window.location.hostname.split('.')[1],
        category: category,
        meta_keyword: keywords,
        meta_description: description,
        score: result
    };
}

const toastApp = {
    toastZone: document.querySelector('.zone'),
    button: document.querySelector('.makeToast'),
    closing: 0,
    count: 0,
    init: function () {
        $('body').append('<div class="spider-toast toast"><ul></ul></div>')
    },
    makeToast: function (txt) {
        toastApp.count += 1;

        //Container
        $('.toast ul').append(
            '<li class="toast-item toast-green down" id="toast-' + toastApp.count + '">' +
            '<div class="toast-content">' +
            '<div class="toast-title">' + 'Info Toast' + '</div>' +
            '<div class="toast-message">' + txt + '</div>' +
            '</div>' +
            '<div class="toast-close"> <span> X </span> </div>' +
            '</li>');

        let self = $('#toast-' + toastApp.count);

        self.find('.toast-close').click(function () {
            let item = $(this).parent();
            item.addClass('toastClose');
            setTimeout(function () {
                // item.style.display = "none"
                item.hide();
            }, 500)
        });

        setTimeout(function () {
            self.find('.toast-close').click();
        }, 3000)

    },
    closeToast: function (ele) {
        let toast = ele.parentElement.parentElement;
        toast.classList.add('toastClose');
        setTimeout(function () {
            toast.style.display = "none"
        }, 500)
    }
};

toastApp.init();

/* 保存当前页面 */
function saveCurrentPage() {
    console.log('Save the current page');
    let item = pageClassify(false);
    $.get('http://liangck.com:8081/data/savePage', item, function (callback) {
        console.log(callback);
        toastApp.makeToast('保存成功');
    });
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

function showCollector() {
    $('.spider').each(function () {
        let _self = $(this);
        _self.append('<div class="collect-showBtn">' +
            '<div>Spider</div>' +
            '<div class="collect-btn">' +
            '<div class="collect-1 collect-item"> 主要节点 </div>' +
            '<div class="collect-2 collect-item"> 帖子区域节点 </div>' +
            '<div class="collect-3 collect-item"> 帖子叶子节点 </div>' +
            '<div class="collect-4 collect-item"> 帖子作者节点 </div>' +
            '</div>' +
            '</div>');

        let _showBtn = _self.find('.collect-showBtn');
        if (_self.hasClass('spider-post')) {
            _showBtn.addClass('collect-post');
        } else if (_self.hasClass('spider-main')) {
            _showBtn.addClass('collect-main');
        } else if (_self.hasClass('listNode')) {
            _showBtn.addClass('collect-listNode');
        } else {

        }

        _self.hover(function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            _self.addClass('collect-hover');

            // if($(this).find('.collect-hover').length){
            //     console.log('Find collect-hover');
            // }else{
            //     console.log('Add hover .... ');
            //     $(this).children('.collect-btn').addClass('collect-hover')
            // }
            // $(this).children('.collect-btn').css('display', 'flex');
        }, function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            _self.removeClass('collect-hover');
            // if($(this).children('.collect-btn').hasClass('collect-hover')){
            //     $(this).children('.collect-btn').removeClass('collect-hover');
            // }
            // $(this).children('.collect-btn').css("display", "none");
        })
    });

    function saveDom(ele, cate) {
        let _btn = ele.parent().parent(),
            _target = _btn.parent(),
            _parent = _target.parent(),
            dom_level = 0,
            self = _target,
            linkContent = [];

        _btn.hide();

        let _innerText = _target.prop('innerText').replace(/(\n)?Spider(\n)?/gi, ''),
            _innerTextLength = _innerText.length,
            _textDensity = _innerTextLength / _target.prop('innerHTML').length,
            _textMainPercentage = _innerTextLength / $('.spider-main').prop('innerText').replace(/(\n)?Spider(\n)?/gi, '').length,
            _textBodyPercentage = _innerTextLength / $('body').prop('innerText').replace(/(\n)?Spider(\n)?/gi, '').length;
        // console.log(_innerText);
        // console.log(_target.text());
        // console.log($('.spider .main').text());

        while (true) {
            if (self.is('body')) {
                break;
            } else {
                self = self.parent();
                dom_level++;
                if (dom_level > 10) {
                    break;
                }
            }
        }

        _target.find('a').each(function () {
            if (($(this).prop('offsetWidth') + $(this).prop('offsetHeight')) !== 0) {
                let _href = $(this).attr('href');
                console.log($(this).prop('offsetWidth') + ' ' + $(this).prop('offsetHeight') + ' ' + _href);
                if (_href && _href.indexOf('javascript:void(0)') < 0 && _href !== '#') {
                    linkContent.push(_href);
                }
                _href = null;
            }
        });


        console.log('ClassName: ' + _target.prop('className'));

        let offset = _target.offset();
        let bias = cate === 'postItem' ? 4 : 0;
        let item = {
            /* meta信息 */
            document_width: $(document).width(),
            document_height: $(document).height(),
            meta_href: window.location.href,
            meta_domain: window.location.hostname.split('.')[1],
            title: document.title,

            /* Property 属性 */
            // classList: _target.prop('classList'),
            classList: _target.prop('className').split('spider')[0].trim().split(' '),

            offsetTop: _target.prop('offsetTop') + bias,
            offsetLeft: _target.prop('offsetLeft') + bias,

            realTop: offset.top,
            realLeft: offset.left,

            width: _target.prop('offsetWidth'),
            height: _target.prop('offsetHeight'),

            dom_level: dom_level,
            childElementCount: (_target.prop('childElementCount') - 1),
            siblingsCount: _target.siblings().length,
            innerText: _innerText.length < 1000 ? _innerText : 'Text too large ... ',

            textDensity: _textDensity,
            textMainPercentage: _textMainPercentage,
            textBodyPercentage: _textBodyPercentage,

            anchorMarkerCount: _target.find('a').length,

            linkElementCount: linkContent.length,
            links: linkContent,

            imageElementCount: _target.find('img').length,

            /* parent Prop */
            relativeTextPercentage: _innerTextLength / _parent.prop('innerText').replace(/(\n)?Spider(\n)?/gi, '').length,

            parentWidth: _parent.prop('offsetWidth'),
            parentHeight: _parent.prop('offsetHeight'),
            parentAnchorMarkerCount: _parent.find('a').length,
            parentImageCount: _parent.find('img').length,

            /* category */
            dom_category: cate
        };
        console.log('Save dom ....');
        console.log(item);
        console.log('Collect End .... ');

        $.ajax({
            //async : false,
            traditional: true,
            type: "post",
            url: "http://liangck.com:8081/data/saveDom",
            data: item,

            success: function (callback) {
                console.log(callback);
                toastApp.makeToast('保存成功');
            }
        });
        // $.post('http://localhost:8081/data/saveDom', item, function (callback) {
        //     console.log(callback);
        //     toastApp.makeToast('保存成功');
        // }, json);

        _btn = null;
        _target = null;
        dom_level = null;
        self = null;
        offset = null;
        linkContent = null;
        item = null;
        _innerText = null;
        _innerTextLength = null;
        _textDensity = null;
        _textPercentage = null;
    }

    $('.collect-1').click(function () {
        saveDom($(this), 'mainArea');
    });
    $('.collect-2').click(function () {
        saveDom($(this), 'postArea');
    });
    $('.collect-3').click(function () {
        saveDom($(this), 'postItem');
    });
    $('.collect-4').click(function () {
        saveDom($(this), 'postItemAuthor');
    });

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
            case "showCollectBtn":
                showCollector();
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
    // pageClassify(true);
}

// $('.collect-btn').click(function () {
//         console.log('Click');
//         collectDom();
//     }
// );

init();

// var t= 'http://www.tianya.cn/99835855';
// if (t && t.indexOf('javascript:void(0)') && t !== '#') {
//     console.log(t);
// }
// else{
//     console.log(false);
// }
