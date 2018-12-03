/**
 * tools.js 工具类和工具函数
 * */

/**
 * Timer 计时器
 * */
const Timer = {
    data: {},
    start: function (key) {
        Timer.data[key] = new Date();
    },
    stop: function (key) {
        let time = Timer.data[key];
        if (time)
            Timer.data[key] = new Date() - time;
    },
    getTime: function (key) {
        return Timer.data[key];
    }
};

/**
 * checkJquery 检查jQuery的环境是否存在
 * */
function checkJQuery(){
    if (jQuery) {
        // jQuery loaded
        console.log('jQuery loaded');
    } else {
        // jQuery not loaded
        console.log('jQuery not loaded');
    }

}

