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
  // Create elements
  const svgElem = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .style('overflow', 'visible');
  //  .style('background', 'red');

  const svg = svgElem.append('g');

  const links = svg
    .selectAll('.links')
    .data(data.links)
    .join('line')
    .attr('stroke', 'black');

  const nodes = svg
    .selectAll('.nodes')
    .data(data.nodes)
    .join('circle')
    .attr('r', 20)
    .attr('fill', 'pink');

  const texts = svg
    .selectAll('.texts')
    .data(data.nodes)
    .join('text')
    .attr('pointer-events', 'none')
    .text((d) => d.id)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle');

  const simulation = d3
    .forceSimulation()
    .force('centerX', d3.forceX(width / 2))
    .force('centerY', d3.forceY(height / 2))
    .force(
      'link',
      d3.forceLink().id((d) => d.id)
    )
    .force('charge', d3.forceManyBody().strength(-500))
    .on('tick', ticked);

  simulation.nodes(data.nodes);
  simulation.force('link').links(data.links);

  function ticked() {
    nodes.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    texts.attr('x', (d) => d.x).attr('y', (d) => d.y);

    links
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);
  }

  svgElem.call(d3.zoom().on('zoom', zoomed));

  function zoomed(e) {
    svg.attr(
      'transform',
      `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`
    );
  }

  nodes.call(
    d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragended)
  );

  function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.y;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  return svgElem.node();
}
