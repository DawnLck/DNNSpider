/**
 * Global.js
 * */
const protocol = document.location.protocol,
  port = protocol === 'https:' ? 8082 : 8081,
  SAVE_PAGE = '/data/saveTestPage',
  SAVE_DOM = '/data/saveTestDom';

const CONFIG = {
    showClassifyResult: true
};

const bodyStyle = window.getComputedStyle(document.getElementsByTagName('body')[0]) || {};
const rootFontSize = parseInt(bodyStyle.fontSize),
  MIN_HEIGHT = 2 * rootFontSize;
