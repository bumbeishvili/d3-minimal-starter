// Import stylesheets
import './style.css';
import * as d3 from 'd3';

let data = null;
const appDiv = document.getElementById('app');

const result = Chart(data, {
  width: 500,
  height: 500,
});
appDiv.appendChild(result);

// Chart function
function Chart(data, { width, height } = {}) {
  // Create elements
  const div = d3.create('div');

  return div.node();
}
