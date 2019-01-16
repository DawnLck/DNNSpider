/**
 *  Clustering Block 可视块聚类
 */

const DBSCAN_CONFIG = {
    MinPt: 6,
    r = 0.6,
};
function distance(A, B) {
    let count = 0;
    const Property = {
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
        enumerable: []
    };
    
    const Css = {
        countable: [
            'font-size',
            'line-height'
        ],
        enumerable: [
            'color',
            'font-weight',
            'font-family'
        ]
    }
    
    let 
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
