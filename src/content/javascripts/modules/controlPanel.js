/**
 * ControlPanel 控制面板
 */

function addControlPanel(pageClassify) {
  console.log("### Show Control Panel ###");

  let classify = [];
  for (let key in pageClassify.score) {
    classify.push({
      cate: key,
      value: pageClassify.score[key]
    });
  }

  console.log(classify);

  const panelHTML = ` 
    <div class="spider spider-control-panel">
      
      <div class="section section_1">
       <h4>网页类型分析</h4>
        <h5>该网页属于【${pageClassify.category}】类型</h5>
        <div id="spider-classify-charts"></div>
      </div>

      <div class="section section_2">
        <h4>网页数据提取</h4>
        <div class="panel-item">
          <h5>预处理层</h5>
          <div class="spider-buttons">
            <button class="spider_btn spider_normal" id="regionFocus">区域聚焦</button>
          </div>
        </div>
        
        <div class="panel-item">
          <h5>输出层</h5>
          <div class="spider-buttons">
            <button class="spider_btn spider_normal" id="classifyBlocks">可视块分类</button>
            <button class="spider_btn spider_normal" id="clusteringBlocks">可视块聚类</button>
          </div>
        </div>
      </div>
      
      <div class="section section_3">
        <h4>状态控制</h4>
        <div class="panel-item">
          <h5>正文区域内的可视块</h5>
          <div class="toggle-wrapper">
            <input id="provide-muffins" name="provide_muffins" class="toggle" type="checkbox" />
            <label for="provide-muffins" class="toggle--label"></label>
            <div class="foux-toggle"></div>
          </div>
        </div>
      </div>
    </div>
`;

  $("body").append(panelHTML);
  $("#regionFocus").click(() => {
    regionFocus();
  });
  $("#classifyBlocks").click(() => {
    classifyBlocks();
  });
  $("#clusteringBlocks").click(() => {
    clusteringBlocks();
  });
  $("#provide-muffins").click(() => {
    switchBlocks($("#provide-muffins").prop("checked"));
  });

  const chart = new G2.Chart({
    container: "spider-classify-charts",
    width: 280,
    height: 180,
    padding: [50, 10, 50, 10]
  });

  chart.axis("value", false);

  chart.source(classify);
  chart.interval().position("cate*value");

  chart
    .interval()
    .position("cate*value")
    .opacity(1)
    .label("value", {
      useHtml: true,
      htmlTemplate: function htmlTemplate(text, item) {
        var a = item.point;
        a.percent = String(parseInt(a.percent * 100)) + "%";
        return `<span class="g2-label-item"><p class="g2-label-item-value">${
          a.value
        }</p></div>`;
      }
    });

  chart.render();
}

function switchBlocks(el) {
  console.log(el);
  if (el) {
    $(".spider-main")
      .find(".spider")
      .addClass("showBlock");
  } else {
    $(".spider-main")
      .find(".spider")
      .removeClass("showBlock");
  }
}
