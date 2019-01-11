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
    <div class="spider-control-panel">
        <h4>网页类型分析</h4>
        <h5>该网页属于【${pageClassify.category}】类型</h5>
        <div id="spider-classify-charts"></div>
    </div>
`;

  $("body").append(panelHTML);

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
