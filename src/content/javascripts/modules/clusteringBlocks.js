/**
 *  Clustering Block 可视块聚类
 */

const DBSCAN_CONFIG = {
  MinPt: 6,
  r: 0.6
};

/* 可视块的属性指标 */
const BlockProperty = {
  countable: [
    "childElementCount",
    "clientHeight",
    "clientLeft",
    "clientTop",
    "clientWidth",
    "offsetHeight",
    "offsetLeft",
    "offsetWidth",
    "offsetTop",
    "scrollHeight",
    "scrollLeft",
    "scrollTop",
    "scrollWidth"
  ],
  enumerable: [
    "className",
    "hidden",
    "nodeName",
    "localName",
    "nodeType",
    "tagName"
  ],
  others: ["innerHTML", "innerText", "outerHTML", "outerText", "textContent"]
};

/* 可视块的样式指标 */
const BlockCss = {
  countable: ["font-size", "line-height"],
  enumerable: ["color", "font-weight", "font-family"],
  others: ["content"]
};

function distance_countable(a, b) {
  let molecular = Math.pow(a - b, 2);
  let denominator = Math.pow(a, 2) + Math.pow(b, 2);
  denominator = denominator ? denominator : 1;
  console.log(`molecular: ${molecular}, denominator: ${denominator}`);
  return 1 - molecular / denominator;
}
function distance_enumerable(a, b) {
  return a === b ? 1 : 0;
}
function distance_other(a, b) {
  return distance_countable(a.length, b.length);
}
function distance(A, B) {
  let count = 0;
  for (let item of BlockProperty.countable) {
    let tem = distance_countable(A[item], B[item]);
    console.log(
      `> Item: ${item}  A[item]: ${A[item]}  B[item]: ${
        B[item]
      }  distance: ${tem}`
    );
  }
  return 0;
}

function clusteringBlocks() {
  console.log("#####  Clustering Block   #####");

  let childrenDoms = $(".spider-main").children(".spider");

  for (let index in childrenDoms) {
    childrenDoms[index].index = index;
  }

  distance(childrenDoms[0], childrenDoms[1]);

  console.log(childrenDoms);
  //   if (childrenDoms.length > 3) {
  //       for(let child of childrenDoms){
  //           if()
  //       }
  //   } else {
  //   }
}
