console.log("Hello from Andre");

// todo list

// 1. Grab the url of the dashboard and store it in a variable
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en-GB&:display_count=y&:origin=viz_share_link";

// 2. Grab the container on the index page
const vizContainer = document.getElementById("vizContainer");

// 2.1 Create viz options
const options = {
  device: "desktop",
};

// 3. Create a function to call the Tableau JS API
function initViz() {
  const viz = new tableau.Viz(vizContainer, url, options);
}

// 4. Call that function
document.addEventListener("DOMContentLoaded", initViz());
