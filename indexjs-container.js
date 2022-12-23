// Import stylesheets
import './style.css';
import * as d3 from 'd3';

const appDiv = document.getElementById('app');

const mappedData = [
  { key: '1 წელი', value: 193 },
  { key: '2 წელი', value: 119 },
  { key: '3 წელი', value: 43 },
  { key: '4 წელი', value: 23 },
  { key: '4-6 წელი', value: 8 },
  { key: '6-9 წელი', value: 3 },
];

const result = Chart(mappedData, appDiv);

// Chart function
function Chart(data, appDiv) {
  // Create elements
  const sum = d3.sum(data, (d) => d.value);

  const svg = d3
    .select(appDiv)
    .append('svg')
    .attr('width', 500)
    .attr('height', 500)
    .style('margin-top', 40)
    .style('border-radius', 20 + 'px');

  const g = svg.selectAll('g').data(data).join('g');

  g.attr('transform', (d, i, arr) => `translate(10,${50 + 25 * i})`);

  g.append('text')
    .text((d) => d.key)
    .attr('y', 16)
    .attr('text-anchor', 'end')
    .attr('x', 140);

  const max = d3.max(data, (d) => d.value);

  const scale = d3.scaleLinear().domain([0, max]).range([0, 300]);

  g.append('rect')
    .attr('height', 20)
    .attr('fill', 'darkblue')
    .attr('x', 150)
    .transition()
    .duration(1000)
    .delay((d, i, arr) => i * 100)
    .attr('width', (d) => scale(d.value));

  g.append('text')
    .text((d) => {
      const p = Math.round((d.value / sum) * 100 * 10) / 10;
      return p + '%';
    })
    .attr('font-size', 11)
    .attr('y', 16)
    .attr('x', 155)
    .transition()
    .duration(1000)
    .delay((d, i, arr) => i * 100)
    .attr('x', (d) => 150 + scale(d.value) + 5);
}
