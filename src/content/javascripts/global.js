/**
 * Global.js
 * */
const rootFontSize = parseInt(window.getComputedStyle(document.getElementsByTagName('body')[0]).fontSize),
  MIN_HEIGHT = 2 * rootFontSize,
  protocol = document.location.protocol,
  port = protocol === 'https:' ? 8082 : 8081,
  SAVE_PAGE = '/data/saveTestPage',
  SAVE_DOM = '/data/saveTestDom';
