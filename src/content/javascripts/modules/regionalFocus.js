/**
 * regionFocus.js
 * 区域聚焦
 * */
const bodyDom = document.getElementsByTagName('body')[0];
const bodyWidth = bodyDom.scrollWidth,
  bodyHeight = bodyDom.scrollHeight,
  bodyContentLength = bodyDom.innerText.length;

// 1. 面积大小比较 >0.4
async function areaComparison(dom) {
    let _width = dom.prop('offsetWidth') / bodyWidth,
      _height = dom.prop('offsetHeight') / bodyHeight,
      areaProportion = (_width * _height) / (bodyWidth * bodyHeight);

    if ((_width / bodyWidth > 0.2) || (_height / bodyHeight > 0.2)) {
        if (areaProportion > CONFIG.threshold.area) {
            dom.addClass('spider spider_areaOk');
            return true;
        } else if (_width / bodyWidth > 0.4 && _self.height() > MIN_HEIGHT) {
            dom.addClass('spider');
        } else {
        }
    }
    return false;
}

// 2. 文本长度比较 >0.3
async function textComparison(dom) {
    let _contentLength = dom.prop('innerText').length,
      textProportion = _contentLength / bodyContentLength;
    if (textProportion > CONFIG.threshold.text) {
        dom.addClass('spider_textOk');
        return true;
    } else {
    }
    return false;
}

// 3. 中心偏移计算 <0.4
async function centerComparison(dom) {
    let pageX = bodyWidth / 2,
      pageY = bodyHeight / 2,
      domX = dom.offset().left + dom.prop('offsetWidth') / 2,
      domY = dom.offset().top + dom.prop('offsetHeight') / 2,
      offset = Math.sqrt(Math.pow(pageX - domX, 2) + Math.pow(pageY - domY, 2)),
    centerProportion = offset / bodyWidth;
    if (centerProportion > CONFIG.threshold.center) {
        dom.addClass('spider_centerOk');
        return true;
    } else {
    }
    return false;
}

// 区域聚焦主程序
async function regionFocus() {
    Timer.start("mainMark");
    console.log('## Mark main area ## ');

    let _allDiv = $('div');

    _allDiv.each(async function () {
        let _self = $(this);
        if (await areaComparison(_self)) {
            if (await textComparison(_self)) {
                await centerComparison(_self);
            } else {

            }
        } else {

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
}
