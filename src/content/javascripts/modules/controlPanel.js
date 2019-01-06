/**
 * ControlPanel 控制面板
 */
const data = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 1150 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 }
];

const panelHTML = ` 
    <div class="spider-control-panel">
        nothing
        <div id="spider-classify-charts"></div>
    </div>
`;
function addControlPanel() {
  console.log("### Show Control Panel ###");
  $("body").append(panelHTML);

  const chart = new G2.Chart({
    container: "spider-classify-charts",
    width: 500,
    height: 500
  });

  chart.source(data);
  chart
    .interval()
    .position("genre*sold")
    .color("genre");
  chart.render();
}
