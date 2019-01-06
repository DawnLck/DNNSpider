/**
 * ControlPanel 控制面板
 */
const panelHTML = ` 
    <div class="spider-control-panel">
        <h3>网页类型分析</h3>
        <div id="spider-classify-charts"></div>
    </div>
`;
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

  $("body").append(panelHTML);

  const chart = new G2.Chart({
    container: "spider-classify-charts",
    width: 280,
    height: 180
  });

  chart.source(classify);
  chart.interval().position("cate*value");
  // .color("genre");
  chart.render();
}
