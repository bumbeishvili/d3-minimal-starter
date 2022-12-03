// Import stylesheets
import './style.css';
import * as d3 from 'd3';

let data = {
  nodes: [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
  ],
  links: [
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 1, target: 3 },
    { source: 1, target: 4 },
    { source: 4, target: 5 },
    { source: 6, target: 7 },
  ],
};

const appDiv = document.getElementById('app');

const result = Chart(data, {
  width: 500,
  height: 500,
});
appDiv.appendChild(result);

// Chart function
function Chart(data, { width, height } = {}) {
  function ticked() {
    console.log('ticking');
  }
  // Create elements
  const svg = d3.create('svg').attr('width', width).attr('height', height);
  //  .style('background-color', 'red');

  // Initialize the links
  const links = svg
    .append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(data.links)
    .join('line')
    .attr('stroke', 'black');

  // Initialize the nodes
  const nodes = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(data.nodes)
    .join('circle')
    .attr('fill', 'pink')
    .attr('stroke', 'black')
    .attr('r', 20);

  const texts = svg
    .append('g')
    .selectAll('text')
    .data(data.nodes)
    .join('text')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('font-size', 10)
    .text((d) => d.id);

  const simulation = d3
    .forceSimulation()
    .force('centerX', d3.forceX(width / 2))
    .force('centerY', d3.forceY(height / 2))
    .force(
      'link',
      d3
        .forceLink() // This force provides links between nodes
        .id((d) => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
    )
    .force('charge', d3.forceManyBody().strength(-500))
    .on('tick', ticked);

  simulation.nodes(data.nodes);
  simulation.force('link').links(data.links);

  function ticked() {
    console.log(data);
    links
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    nodes.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

    texts
      .attr('x', (d) => d.x) //position of the lower left point of the text
      .attr('y', (d) => d.y); //position of the lower left point of the text
  }

  return svg.node();
}
