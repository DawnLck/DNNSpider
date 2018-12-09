/* Content.js 匹配页面注入代码
* */
const DATE_REG = /\d{4}-\d{2}-\d{2}|((\d{4})年)?(\d{1,2})月(\d{1,2})日|\d{2}:\d{2}/;

/* 标记主要区域 */
function markMainAreaPromise() {
    console.log('Mark main area based on Promise');

    return new Promise(function (resolve, reject) {
        Timer.start("mainMark");
        console.log('Mark main area ... ');

        let _bodyDom = document.getElementsByTagName('body')[0],
          _allDiv = $('div');

        let _body = {
            node: _bodyDom,
            width: _bodyDom.scrollWidth,
            height: _bodyDom.scrollHeight,
            contentLength: _bodyDom.innerText.length,
            rootFontSize: parseInt(window.getComputedStyle(_bodyDom).fontSize),
        };

        console.log('Body { width:' + _body.width + ' height: ' + _body.height + ' }');
        console.log('Body Font-size: ' + rootFontSize);

        let _bodyWidth = _body.width,
          _bodyHeight = _body.height,
          _bodyContentLength = _body.contentLength;

        //初步标记
        _allDiv.each(function () {
            let _self = $(this);
            let _widthProportion = _self.prop('offsetWidth') / _bodyWidth * 100.0,
              _heightProportion = _self.prop('offsetHeight') / _bodyHeight * 100.0,
              _textLength = _self.prop('innerText').length,
              _textProportion = _textLength / _bodyContentLength * 100.0;

            // console.log(`_TextLength: ${_textProportion}  _WidthProp: ${_widthProportion}`);

            if (_widthProportion > 30) {
                if (_widthProportion * _heightProportion > 4000) {
                    console.log(_widthProportion + ' ' + _heightProportion);
                    _self.addClass('spider spider-main');
                } else if (_self.height() > MIN_HEIGHT) {
                    _self.addClass('spider');
                } else {
                }
            }
        });


        // 降低维度 平面化
        $('.spider').each(function () {
            let _self = $(this),
              _parent = _self.parent(),
              _width = _self.prop('offsetWidth'),
              _height = _self.prop('offsetHeight');

            while (true) {
                if (_parent.hasClass('spider')) {
                    let _parentWidth = _parent.prop('offsetWidth'),
                      _parentHeight = _parent.prop('offsetHeight');
                    if (_parentWidth < _width * 1.2 && _parentHeight < _height * 1.2) {
                        _parent.removeClass('spider');
                        _parent = _parent.parent();
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        });

        // 解决正文区域嵌套的问题
        $('.spider-main').each(function () {
            let _self = $(this),
              _parent = _self.parent(),
              _width = _self.prop('offsetWidth'),
              _height = _self.prop('offsetHeight');

            while (true) {
                let _parentWidth = _parent.prop('offsetWidth'),
                  _parentHeight = _parent.prop('offsetHeight');

                if (_parent.hasClass('spider-main')) {
                    if (_parentWidth < _width * 1.2 || _parentHeight < _height * 1.2) {
                        _parent.removeClass('spider-main'); //todo 如果是父节点去除spider-main，则范围缩小，反之放大
                        _parent = _parent.parent();
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        });

        $('.spider-main').each(function () {
            let _self = $(this);
            if (_self.find('.spider-main').length > 0) {
                _self.removeClass('spider-main');
            }
        });

        $('.spider-main').siblings('.spider').each(function () {
            $(this).addClass('spider-nonMain');
            // console.log('Area Siblings ... ');
        });

        Timer.stop("mainMark");
        console.log("The main Mark time is: " + Timer.getTime('mainMark'));
    });
}

/* 标记帖子区域 */
function markPostAreaPromise() {
    console.log('Mark post area based on Promise ... ');
    return new Promise(function (resolve, reject) {
        Timer.start("markPost");

        let mainSelector = $('.spider-main');
        let mainWidth = mainSelector.prop('offsetWidth'),
          mainHeight = mainSelector.prop('offsetHeight');

        mainSelector.addClass('spider-content');

        function markContentNode(self) {
            self.children().each(function () {
                markContentNode($(this));
                let _self = $(this),
                  _width = _self.prop('offsetWidth'),
                  _height = _self.prop('offsetHeight'),
                  _date = _self.prop('innerHTML').match(DATE_REG);

                if (_width / mainWidth * 100 > 70 && _height > MIN_HEIGHT && (_date || _self.siblings('.spider-content'))) {
                    _self.addClass('spider spider-content');
                } else {
                }
            });

            if (self.prop('offsetHeight') / mainHeight * 100.0 > 70 && self.children('.spider-content').length > 5) {
                self.addClass('spider-post');
            }
        }

        markContentNode(mainSelector);

        $('.spider-post').each(function () {
            if ($(this).find('.spider-post').length > 0) {
                console.log('Unmark the post ... ');
                $(this).removeClass('spider-post');
            }
        });

        Timer.stop("markPost");
        console.log("The post mark time is: " + Timer.getTime('markPost'));
    });
}

/* 标记列表节点 */
function markListNodePromise() {
    return new Promise(function () {
        Timer.start("markList");
        console.log('Mark list node ... ');

        $('.spider-post').children('.spider-content').each(function () {
            let _self = $(this),
              _leafWidth = _self.prop('offsetWidth'),
              _leafHeight = _self.prop('offsetHeight');

            if (_self.prop('innerText').replace(/\n+|\s+/gi, '').length > 10) {
                _self.addClass('listNode');

                function markLeafComponents(self) {
                    self.children().each(function () {
                        let _s = $(this),
                          _width = _s.width() / _leafWidth * 100.0,
                          _height = _s.height() / _leafHeight * 100.0;

                        if ((_s.width() > 12 && _height > 70) || (_s.height() > 12 && _width > 70)) {
                            _s.addClass('spider listNode_components');
                            markLeafComponents(_s);
                        }

                        _width = null;
                        _height = null;
                        _s = null;
                    })
                }

                markLeafComponents(_self);
            }
        });

        Timer.stop("markList");
        console.log("The post mark time is: " + Timer.getTime('markList'));
    })
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
    $.get(protocol + '//liangck.com:' + port + SAVE_PAGE, item, function (callback) {
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
    $('.spider-main .spider').each(function () {
        let _self = $(this),
          _btnHtml = '<div class="collect-showBtn">' +
            '<div>Spider</div>' +
            '<div class="collect-btn">' +
            '<div class="collect-1 collect-item"> 主要节点 </div>' +
            '<div class="collect-2 collect-item"> 帖子区域节点 </div>' +
            '<div class="collect-3 collect-item"> 帖子叶子节点 </div>' +
            '<div class="collect-4 collect-item"> 帖子作者节点 </div>' +
            '</div>' +
            '</div>';
        if (_self.prop('tagName') === 'TR') {
            _btnHtml = '<td style="width: 0">' + _btnHtml + '</td>';
        }
        _self.append(_btnHtml);

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

        }, function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            _self.removeClass('collect-hover');
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
            tag: _target.prop('tagName'),
            id: _target.prop('id'),
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

            /* CSS prop */
            font_size: _target.css('font-size'),
            font_family: _target.css('font-family'),
            font_weight: _target.css('font_weight'),
            line_height: _target.css('line_height'),
            // font_color: _target.css('color'),

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
            url: protocol + "//liangck.com:" + port + SAVE_DOM,
            data: item,

            success: function (callback) {
                console.log(callback);
                toastApp.makeToast('保存成功');
            }
        });

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
        _textMainPercentage = null;
        _textBodyPercentage = null;
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
              markMainAreaPromise()
                .then(markPostAreaPromise())
                .then(markListNodePromise())
                .then(function () {
                    sendResponse('Mark Done!');
                });
              break;
          case "showCollectBtn":
              showCollector();
              break;
          case "markUndo":
              markUndo();
              sendResponse('UndoMark Done!');
              break;
          case "markMainArea":
              markMainAreaPromise().then(function () {
                  sendResponse('Mark Main-Area Done!');
              });
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
    setTimeout(function () {
        $('body').find('iframe').remove('');
    }, 2000);

    // contentInit();
    // markMainArea();
    pageClassify(true);
    // markMainAreaPromise();
}

$(document).ready(function () {
    init();
});
