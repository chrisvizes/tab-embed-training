let viz;

// todo list

// 1. Grab the url of the dashboard and store it in a variable
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en-GB&:display_count=y&:origin=viz_share_link";

// 2. Grab the container on the index page
const vizContainer = document.getElementById("vizContainer");

// 2.1 Create viz options
const options = {
  device: "desktop",
  Category: ["Technology", "Office Supplies"],
  onFirstInteractive: function () {
    document.getElementById("minValue").disabled = false;
    document.getElementById("maxValue").disabled = false;
    document.getElementById("filterButton").disabled = false;
  },
};

// 3. Create a function to call the Tableau JS API
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

// grab the pdf button
const pdfButton = document.getElementById("pdfButton");

function generatePDF() {
  viz.showExportPDFDialog();
}

pdfButton.addEventListener("click", generatePDF);

// grab the powerpoint button
const powerpointButton = document.getElementById("powerpointButton");

function generatePowerPoint() {
  viz.showExportPowerPointDialog();
}
powerpointButton.addEventListener("click", generatePowerPoint);

// grab the swap viz utton
const swapViz = document.getElementById("swapViz");

function switchViz() {
  console.log("Changing the dashboard");
  const otherVizUrl =
    "https://public.tableau.com/views/PotatoSavings/atoe?:language=en-GB&:display_count=y&:origin=viz_share_link";
  if (viz) {
    viz.dispose();
  }
  viz = new tableau.Viz(vizContainer, otherVizUrl, options);
}

swapViz.addEventListener("click", switchViz);

function getRangeValue() {
  console.log("Filtering dashboard...");
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Filter Applied"));
}
document
  .getElementById("filterButton")
  .addEventListener("click", getRangeValue);

// Call that function
document.addEventListener("DOMContentLoaded", initViz());
