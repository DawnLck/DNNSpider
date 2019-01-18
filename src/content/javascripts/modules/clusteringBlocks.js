/**
 *  Clustering Block 可视块聚类
 */

const DBSCAN_CONFIG = {
    MinPt: 6,
    r = 0.6,
};

/* 可视块的属性指标 */
const BlockProperty = {
    countable: [
        'childElementCount',
        'clientHeight',
        'clientLeft',
        'clientTop',
        'clientWidth',
        'offsetHeight',
        'offsetLeft',
        'offsetWidth',
        'offsetTop',
        'scrollHeight',
        'scrollLeft',
        'scrollTop',
        'scrollWidth'
    ],
    enumerable: [
        'className',
        'hidden',
        'nodeName',
        'localName',
        'nodeType',
        'tagName',
    ],
    others: [
        'innerHTML',
        'innerText',
        'outerHTML',
        'outerText',
        'textContent',
    ]
};

/* 可视块的样式指标 */
const BlockCss = {
    countable: [
        'font-size',
        'line-height'
    ],
    enumerable: [
        'color',
        'font-weight',
        'font-family',
    ],
    others: [
        'content'
    ]
}

function distance_countable(a, b){
    let molecular = Math.pow((a-b), 2);
    return 1;
}
function distance_enumerable(a, b){
    
}
function distance(A, B) {
    let count = 0;
    for(let item of BlockProperty.countable){
        distance_countable();
    }
}

function clusteringBlocks() {
  console.log("#####  Clustering Block   #####");

  let childrenDoms = $(".spider-main").children(".spider");

  for (index in childrenDoms) {
    childrenDoms[index].index = index;
  }

  console.log(childrenDoms);
  //   if (childrenDoms.length > 3) {
  //       for(let child of childrenDoms){
  //           if()
  //       }
  //   } else {
  //   }
}
