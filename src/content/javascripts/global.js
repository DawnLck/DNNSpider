/**
 * Global.js
 * */
const protocol = document.location.protocol,
  port = protocol === "https:" ? 8082 : 8081,
  SAVE_PAGE = "/data/saveTestPage",
  SAVE_DOM = "/data/saveTestDom";

const bodyStyle =
  window.getComputedStyle(document.getElementsByTagName("body")[0]) || {};
const rootFontSize = parseInt(bodyStyle.fontSize),
  MIN_HEIGHT = 2 * rootFontSize;

const CONFIG = {
  showClassifyResult: true,
  threshold: {
    center: 0.4,
    area: 0.3,
    text: 0.6,
    areaMargin: 0.2
  }
};

// let ClassifyResult = {};
