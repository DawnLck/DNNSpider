const GLOBAL = {
    //论坛类
    bbs: {
        primaryKeys: [
            'bbs',
            'BBS',
            '论坛',
            '贴吧'
        ],
        secondKeys: [
            '社区',
            '家园'
        ]
    },
    //博客文章类
    articles: {
        primaryKeys: [
            '博客',
            '文章',
            '作者',
            '首发',
            '转载'
        ],
        secondKeys: [
            '佳作',
            '正文',
            '专栏',
            '收藏',
            '关注'
        ]
    },
    //新闻类
    news: {
        primaryKeys: [
            '新闻',
            '记者',
            '编辑',
            '晚报',
            '早报'
        ],
        secondKeys: [
            '频道',
            '观点',
            '人民',
            '突发',
            '实时'
        ]
    },
    //生活服务类
    service: {
        primaryKeys: [
            '新闻',
            '记者',
            '编辑',
            '晚报',
            '早报'
        ],
        secondKeys: [
            '频道',
            '观点',
            '人民',
            '突发',
            '实时'
        ]
    },
    //电商网站类
    o2o: {
        primaryKeys: [
            '新闻',
            '记者',
            '编辑',
            '晚报',
            '早报'
        ],
        secondKeys: [
            '频道',
            '观点',
            '人民',
            '突发',
            '实时'
        ]
    }
};

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

// if (jQuery) {
//     // jQuery loaded
//     console.log('jQuery loaded');
// } else {
//     // jQuery not loaded
//     console.log('jQuery not loaded');
// }
