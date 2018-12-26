/**
 * regionFocus.js
 * 区域聚焦
 * */
const bodyDom = document.getElementsByTagName("body")[0];
const bodyWidth = bodyDom.scrollWidth,
  bodyHeight = bodyDom.scrollHeight,
  pageX = bodyWidth / 2,
  pageY = bodyHeight / 2,
  bodyContentLength = bodyDom.innerText.length;

// 1. 面积大小比较 >0.4
async function areaComparison(dom) {
  let _width = dom.prop("offsetWidth"),
    _height = dom.prop("offsetHeight"),
    areaProportion = (_width * _height) / (bodyWidth * bodyHeight);

  if (_width / bodyWidth > 0.2 || _height / bodyHeight > 0.2) {
    if (areaProportion > CONFIG.threshold.area) {
      dom.addClass("spider spider-areaOk");
      return true;
    } else if (_width / bodyWidth > 0.4 && _height > MIN_HEIGHT) {
      dom.addClass("spider");
    } else {
    }
  }
  return false;
}

// 2. 文本长度比较 >0.3
async function textComparison(dom) {
  let _contentLength = dom.prop("innerText").length,
    textProportion = _contentLength / bodyContentLength;
  if (textProportion > CONFIG.threshold.text) {
    dom.addClass("spider-textOk");
    return true;
  } else {
  }
  return false;
}

// 3. 中心偏移计算 <0.4
async function centerComparison(dom) {
  console.log("》 中心偏移计算 《");
  let domX = dom.offset().left + dom.prop("offsetWidth") / 2,
    domY = dom.offset().top + dom.prop("offsetHeight") / 2,
    offset = Math.sqrt(Math.pow(pageX - domX, 2) + Math.pow(pageY - domY, 2)),
    centerProportion = offset / bodyWidth;
  console.log(`[${domX}, ${domY}] / [${pageX}, ${pageY}]`);
  console.log(`offset: ${offset}  bodyWidth: ${bodyWidth}`);
  if (centerProportion < CONFIG.threshold.center) {
    dom.addClass("spider-centerOk spider-main");
    return true;
  } else {
  }
  return false;
}

// 维度重叠
async function dimensionOverlap(doms) {
  doms.each(() => {
    let _self = $(this),
      _parent = _self.parent(),
      _width = _self.prop("offsetWidth"),
      _height = _self.prop("offsetHeight");

    while (true) {
      if (_parent.hasClass("spider")) {
        let _parentWidth = _parent.prop("offsetWidth"),
          _parentHeight = _parent.prop("offsetHeight");
        if (_parentWidth < _width * 1.2 && _parentHeight < _height * 1.2) {
          _parent.removeClass("spider");
          _parent = _parent.parent();
        } else {
          break;
        }
      } else {
        break;
      }
    }
  });
}

// 嵌套解耦
async function deNesting(doms) {
  doms.each(function() {
    let _self = $(this),
      _parent = _self.parent(),
      _width = _self.prop("offsetWidth"),
      _height = _self.prop("offsetHeight");

    while (true) {
      let _parentWidth = _parent.prop("offsetWidth"),
        _parentHeight = _parent.prop("offsetHeight");

      if (_parent.hasClass("spider-main")) {
        if (_parentWidth < _width * 1.2 || _parentHeight < _height * 1.2) {
          _parent.removeClass("spider-main"); //todo 如果是父节点去除spider-main，则范围缩小，反之放大
          _parent = _parent.parent();
        } else {
          break;
        }
      } else {
        break;
      }
    }
  });
}

// 合并区域
async function mergeArea() {
  $(".spider-main").each(function() {
    let _self = $(this);
    if (_self.find(".spider-main").length > 0) {
      _self.removeClass("spider-main");
    }
  });
}

// 区域聚焦主程序
async function regionFocus() {
  Timer.start("regionFocus");
  console.log("## Region Focus ## ");

  let _allDiv = $("div");

  _allDiv.each(async function() {
    let _self = $(this);
    if (await areaComparison(_self)) {
      console.log("Area Ok!");
      if (await textComparison(_self)) {
        console.log("Text Ok!");
        await centerComparison(_self);
      } else {
      }
    } else {
    }
  });

  // 维度重叠
  // dimensionOverlap($('.spider'));

  // 嵌套解耦
  // deNesting($('.spider-main'));

  // 合并区域
  // mergeArea();

  // 标记非正文区域节点
  $(".spider-main")
    .siblings(".spider")
    .each(function() {
      $(this).addClass("spider-nonMain");
      // console.log('Area Siblings ... ');
    });

  Timer.stop("regionFocus");
  console.log("The region focus time is: " + Timer.getTime("regionFocus"));
}
