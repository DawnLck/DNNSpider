/**
 * Webpage Classification 网页分类
 * */
const Classification = {
  //论坛类
  bbs: {
    primaryKeys: ["bbs", "BBS", "Forums", "论坛", "贴吧"],
    secondKeys: ["社区", "家园"]
  },
  //博客文章类
  articles: {
    primaryKeys: ["博客", "文章", "作者", "首发", "转载"],
    secondKeys: ["佳作", "正文", "专栏", "收藏", "关注"]
  },
  //新闻类
  news: {
    primaryKeys: ["新闻", "记者", "编辑", "晚报", "早报"],
    secondKeys: ["频道", "观点", "人民", "突发", "实时"]
  },
  //生活服务类
  service: {
    primaryKeys: ["新闻", "记者", "编辑", "晚报", "早报"],
    secondKeys: ["频道", "观点", "人民", "突发", "实时"]
  },
  //电商网站类
  o2o: {
    primaryKeys: ["新闻", "记者", "编辑", "晚报", "早报"],
    secondKeys: ["频道", "观点", "人民", "突发", "实时"]
  },
  search: {
    primaryKeys: ["搜索"],
    secondKeys: ["百度", "谷歌", "记录"]
  }
};

/* 在网页中显示分类结果 */
function displayClassifyResult(result) {
  console.log(result);
  if (CONFIG.showClassifyResult && result && result.score) {
    let cateList = "";
    let cates = result.score || {};
    for (let key in cates) {
      if (cates.hasOwnProperty(key)) {
        cateList += `<li>[<span>${key}</span>${cates[key]}]</li>`;
      }
    }
    $("body").append(
      `<div class="spider-toast toast spider-classify"> 
            <div class="toast-item toast-green">
                <div class="toast-content"> 
                  <div class="toast-title">网页类型分析</div> 
                  <div class="toast-message">
                    <div class="category">Cate: ${result.category.toUpperCase()}</div>
                    <ul class="otherCate">${cateList}</ul>
                  </div> 
              </div> 
              <div class="toast-close"></div> 
            </div>
           </div>`
    );
  } else {
  }
}

/* 网页分类计算权重 */
function calculateWeights(count, text, weight) {
  if (!text) {
    return count;
  }
  for (let key in Classification) {
    let _tem = Classification[key];
    for (let j = 0; j < _tem.primaryKeys.length; j++) {
      if (text.indexOf(_tem.primaryKeys[j]) > -1) {
        count[key] += 2 * weight;
      }
    }
    for (let x = 0; x < _tem.secondKeys.length; x++) {
      if (text.indexOf(_tem.secondKeys[x]) > -1) {
        count[key] += 1 * weight;
      }
    }
  }
  return count;
}

/* 网页分类 */
function pageClassify() {
  console.info("### DNNSpider - 网页分类 ###");

  const title = document.title,
    hostname = window.location.hostname,
    keywords = $('meta[name="keywords"]').attr("content"),
    description =
      $('meta[name="description"]').attr("content") ||
      $('meta[name="Description"]').attr("content");

  let result = {};

  for (let key in Classification) {
    result[key] = hostname.indexOf(key) > -1 ? 1000 : 0;
  }

  calculateWeights(result, title, 3);
  calculateWeights(result, keywords, 2);
  calculateWeights(result, description, 1);

  if (result.bbs + result.articles + result.news === 0) {
    result = calculateWeights(result, $("body").prop("innerText"), 1);
  }

  let category = "bbs",
    categoryValue = result.bbs;
  for (let key in result) {
    if (result.hasOwnProperty(key)) {
      if (result[key] > categoryValue) {
        category = key;
        categoryValue = result[key];
      }
    }
  }

  let output = {
    title: title,
    url: window.location.href,
    domain: hostname.split(".")[1],
    category: category,
    meta_keyword: keywords,
    meta_description: description,
    score: result
  };

  // displayClassifyResult(output);

  console.log(`Title: ${title}`);
  console.log(`Keywords: ${keywords}`);
  console.log(`Description: ${description}`);
  console.log(`Category: ${category}`);

  return output;
}
