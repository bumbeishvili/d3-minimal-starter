// Import stylesheets
import './style.css';
import * as d3 from 'd3';

const appDiv = document.getElementById('app');

const data = [
  {
    value: 10,
    date: 'jun 20 2022',
  },
  {
    value: 60,
    date: 'jun 25 2022',
  },
  {
    value: 40,
    date: 'jun 28 2022',
  },
  {
    value: 40,
    date: 'jul 2 2022',
  },
  {
    value: 75,
    date: 'jul 7 2022',
  },

  {
    value: 30,
    date: 'jul 10 2022',
  },

  {
    value: 80,
    date: 'jul 13 2022',
  },

  {
    value: 60,
    date: 'jul 15 2022',
  },
];

data.forEach((d) => {
  d.date = new Date(d.date);
});

const result = Chart(data, {
  width: 800,
  height: 500,
});

appDiv.appendChild(result);

// Chart function
function Chart(data, { width, height } = {}) {
  console.log(data);

  const chartHeight = 200;
  const chartWidth = 700;

  // Create elements
  const svg = d3.create('svg').attr('width', width).attr('height', height);

  const maxY = d3.max(data, (d) => d.value);

  const yScale = d3.scaleLinear().domain([0, maxY]).range([chartHeight, 0]);

  const dateExtent = d3.extent(data, (d) => d.date);

  const xScale = d3.scaleTime().domain(dateExtent).range([0, chartWidth]);

  const wrapper = svg.append('g').attr('transform', 'translate(40,30)');

  wrapper.append('g').html(`
  <defs class="defs-element">
  <filter class="shadow-filter-element" id="custom" y="-50%" x="-50%" height="200%" width="200%">
      <feGaussianBlur class="feGaussianBlur-element" in="SourceAlpha" stdDeviation="5" result="blur"></feGaussianBlur>
      <feOffset class="feOffset-element" in="blur" result="offsetBlur" dx="10" dy="20" x="8" y="8"></feOffset>
      <feFlood class="feFlood-element" in="offsetBlur" flood-color="black" flood-opacity="0.4" result="offsetColor"></feFlood>
      <feComposite class="feComposite-element" in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"></feComposite>
      <feMerge class="feMerge-element"><feMergeNode class="feMergeNode-blur" in="offsetBlur"></feMergeNode>
      <feMergeNode class="feMergeNode-graphic" in="SourceGraphic"></feMergeNode></feMerge>
 </filter>
</defs>
  `);

  let reactWrapper = wrapper
    .append('rect')
    .attr('width', 40)
    .attr('height', chartHeight)
    .attr('x', 100)
    .attr('fill', '#F9EBF1');

  // Axis Y
  const axisY = d3.axisLeft(yScale).tickSize(-chartWidth).ticks(4);
  const axisYG = wrapper.append('g').call(axisY);

  axisYG
    .selectAll('text')
    .attr('opacity', 0.4)
    .attr('font-size', '13')
    .attr('x', -10);

  // Axis X
  const axisX = d3.axisBottom(xScale).tickSize(-chartHeight);
  const axisXG = wrapper
    .append('g')
    .attr('transform', `translate(0,${chartHeight})`)
    .call(axisX);

  axisXG
    .selectAll('text')
    .attr('opacity', 0.4)
    .attr('font-size', '13')
    .attr('y', 15)
    .text((d, i, arr) => {
      const month = d.toLocaleString(undefined, { month: 'short' });
      const date = d.getDate();
      const dateAhead = date + 7;
      if (i % 3 == 0) return month + ' ' + date + ' - ' + dateAhead;
      return '';
    })
    .each((d, i, arr) => {
      if (i == 6) {
        const res = xScale(d3.select(arr[i + 1]).datum()) - xScale(arr[i].__data__);
        console.log({ res });
        reactWrapper.attr('x', xScale(d)).attr('width', res);
      }
    });

  // draw line
  const line = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x((dataRow) => {
      return xScale(dataRow.date);
    })
    .y((dataRow) => {
      return yScale(dataRow.value);
    });

  // console.log('result', line(data));

  wrapper
    .append('path')
    .attr('filter', 'url(#custom)')
    .attr('d', line(data))
    .attr('fill', 'none')
    .attr('stroke', '#E94F8A')
    .attr('stroke-width', 4);

  return svg.node();
}
