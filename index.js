// Import stylesheets
import './style.css';
import * as d3 from 'd3';

let data = null;
const appDiv = document.getElementById('app');

Promise.all([
  d3.json(
    'https://raw.githubusercontent.com/bumbeishvili/geojson-georgian-regions/master/SubRegions_low_quality.json'
  ),
  d3.csv(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSIpAJImjeuyH31E58U2ZM1q5umOyomF6UAHZXaMkGLtOvsN6biQ9kZxps1gjOFBa_2wNeKZsDBsi87/pub?output=csv'
  ),
]).then(([geojson, data]) => {
  const result = Chart(
    { geojson, data },
    {
      width: 500,
      height: 500,
    }
  );

  appDiv.appendChild(result);
});

// Chart function
function Chart({ geojson, data }, { width, height } = {}) {
  // Create elements
  const svg = d3.create('svg').attr('width', width).attr('height', height);
  //  .style('background-color', 'red');

  const projection = d3.geoMercator().fitSize([width, height], geojson);

  var path = d3.geoPath().projection(projection);

  // Draw paths
  svg
    .selectAll('.regon-paths')
    .data(geojson.features)
    .join('path')
    .attr('d', (d) => path(d))
    .attr('fill', 'lightgray')
    .attr('stroke', 'white');

  const extent = d3.extent(data, (d) => +d.population);

  const scale = d3.scaleSqrt().domain(extent).range([0, 30]);

  // draw circles
  svg
    .selectAll('.regon-circles')
    .data(data)
    .join('circle')
    .attr('r', (d) => scale(d.population))
    .attr('fill', 'red')
    .attr('stroke', 'red')
    .attr('stroke-width', 3)
    .attr('fill-opacity', 0.5)
    .attr('cx', (d) => projection([d.long, d.lat])[0])
    .attr('cy', (d) => projection([d.long, d.lat])[1]);

  return svg.node();
}
