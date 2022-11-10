// Import stylesheets
import './style.css';
import * as d3 from 'd3';

const appDiv = document.getElementById('app');

const data = getData();

data.forEach((d) => {
  d.date = new Date(d.date);
});

const result = Chart(data, {
  width: 800,
  height: 800,
});

appDiv.appendChild(result);

// Chart function
function Chart(data, { width, height } = {}) {
  // Create elements
  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .style('font-family', 'sans-serif')
    .style('font-size', 10);

  const min = d3.min(data, (d) => d.temp);
  const max = d3.max(data, (d) => d.temp);
  const innerRadius = (0.35 * width) / 2;
  const outerRadius = (0.9 * width) / 2;
  const eachAngle = (Math.PI * 2) / data.length;

  const yScale = d3
    .scaleLinear()
    .domain([min, max])
    .range([innerRadius, outerRadius]);

  const color = d3
    .scaleLinear()
    .domain([min, 0, 0, max])
    .range(['darkblue', 'skyblue', 'orange', 'darkred']);

  const arc = d3
    .arc()
    .innerRadius((d) => Math.min(yScale(d.temp), yScale(0)))
    .outerRadius((d) => Math.max(yScale(d.temp), yScale(0)))
    .startAngle((d, i) => eachAngle * i)
    .endAngle((d, i) => eachAngle * i + eachAngle);

  const center = svg
    .append('g')
    .attr('class', 'container')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  center
    .selectAll('path')
    .data(data)
    .join('path')
    .style('fill', (d) => color(d.temp))
    .style('stroke', (d) => color(d.temp))
    .attr('d', arc);

  // Radial Axis
  const radialAxis = center.append('g');
  const ticks = yScale.ticks(5);
  const radialGroups = radialAxis.selectAll('g').data(ticks).join('g');
  radialGroups
    .append('circle')
    .attr('r', (d) => yScale(d))
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-opacity', 0.1);

  radialGroups
    .append('text')
    .attr('y', (d) => -yScale(d))
    .style('stroke', 'white')
    .style('stroke-width', 5)
    .attr('x', -5)
    .text((d) => d)
    .clone(true)
    .style('stroke', 'none');

  svg
    .append('text')
    .text('Gudauri Temp (°C)')
    .attr('y', 25)
    .attr('x', width / 2 - 100);
  // Vertical  Axis

  const months = [
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  const vertAxis = center.append('g');
  const horGroups = vertAxis
    .selectAll('g')
    .data(months)
    .join('g')
    .attr('transform', (d, i, arr) => {
      return `
            rotate(${(360 / 12) * i - 90})
            translate(${innerRadius},0)
      `;
    });

  horGroups
    .append('line')
    .attr('x1', -5)
    .attr('x2', outerRadius - innerRadius + 10)
    .attr('stroke', 'black')
    .attr('opacity', '0.2');

  horGroups
    .append('text')
    .text((d) => d)
    .attr('text-anchor', 'middle')
    .attr('transform', (d, i, arr) => {
      let rotate = 0;
      if (i > 6 && i < 12) rotate = 180;
      return `translate(-15,10) rotate(${rotate})`;
    });

  return svg.node();
}

function getData() {
  return [
    { temp: 18, date: '1 Aug 2021 ' },
    { temp: 17, date: '2 Aug 2021 ' },
    { temp: 18, date: '3 Aug 2021 ' },
    { temp: 19, date: '4 Aug 2021 ' },
    { temp: 20, date: '5 Aug 2021 ' },
    { temp: 20, date: '6 Aug 2021 ' },
    { temp: 20, date: '7 Aug 2021 ' },
    { temp: 21, date: '8 Aug 2021 ' },
    { temp: 20, date: '9 Aug 2021 ' },
    { temp: 21, date: '10 Aug 2021 ' },
    { temp: 21, date: '11 Aug 2021 ' },
    { temp: 19, date: '12 Aug 2021 ' },
    { temp: 19, date: '13 Aug 2021 ' },
    { temp: 19, date: '14 Aug 2021 ' },
    { temp: 18, date: '15 Aug 2021 ' },
    { temp: 17, date: '16 Aug 2021 ' },
    { temp: 17, date: '17 Aug 2021 ' },
    { temp: 18, date: '18 Aug 2021 ' },
    { temp: 19, date: '19 Aug 2021 ' },
    { temp: 18, date: '20 Aug 2021 ' },
    { temp: 18, date: '21 Aug 2021 ' },
    { temp: 18, date: '22 Aug 2021 ' },
    { temp: 20, date: '23 Aug 2021 ' },
    { temp: 20, date: '24 Aug 2021 ' },
    { temp: 19, date: '25 Aug 2021 ' },
    { temp: 20, date: '26 Aug 2021 ' },
    { temp: 20, date: '27 Aug 2021 ' },
    { temp: 20, date: '28 Aug 2021 ' },
    { temp: 21, date: '29 Aug 2021 ' },
    { temp: 20, date: '30 Aug 2021 ' },
    { temp: 21, date: '31 Aug 2021 ' },
    { temp: 20, date: '1 Sep 2021 ' },
    { temp: 19, date: '2 Sep 2021 ' },
    { temp: 15, date: '3 Sep 2021 ' },
    { temp: 13, date: '4 Sep 2021 ' },
    { temp: 15, date: '5 Sep 2021 ' },
    { temp: 15, date: '6 Sep 2021 ' },
    { temp: 16, date: '7 Sep 2021 ' },
    { temp: 14, date: '8 Sep 2021 ' },
    { temp: 15, date: '9 Sep 2021 ' },
    { temp: 15, date: '10 Sep 2021 ' },
    { temp: 14, date: '11 Sep 2021 ' },
    { temp: 16, date: '12 Sep 2021 ' },
    { temp: 15, date: '13 Sep 2021 ' },
    { temp: 17, date: '14 Sep 2021 ' },
    { temp: 16, date: '15 Sep 2021 ' },
    { temp: 18, date: '16 Sep 2021 ' },
    { temp: 17, date: '17 Sep 2021 ' },
    { temp: 14, date: '18 Sep 2021 ' },
    { temp: 15, date: '19 Sep 2021 ' },
    { temp: 15, date: '20 Sep 2021 ' },
    { temp: 14, date: '21 Sep 2021 ' },
    { temp: 15, date: '22 Sep 2021 ' },
    { temp: 11, date: '23 Sep 2021 ' },
    { temp: 11, date: '24 Sep 2021 ' },
    { temp: 10, date: '25 Sep 2021 ' },
    { temp: 10, date: '26 Sep 2021 ' },
    { temp: 8, date: '27 Sep 2021 ' },
    { temp: 11, date: '28 Sep 2021 ' },
    { temp: 10, date: '29 Sep 2021 ' },
    { temp: 11, date: '30 Sep 2021 ' },
    { temp: 10, date: '1 Oct 2021 ' },
    { temp: 8, date: '2 Oct 2021 ' },
    { temp: 9, date: '3 Oct 2021 ' },
    { temp: 10, date: '4 Oct 2021 ' },
    { temp: 9, date: '5 Oct 2021 ' },
    { temp: 8, date: '6 Oct 2021 ' },
    { temp: 7, date: '7 Oct 2021 ' },
    { temp: 7, date: '8 Oct 2021 ' },
    { temp: 6, date: '9 Oct 2021 ' },
    { temp: 6, date: '10 Oct 2021 ' },
    { temp: 6, date: '11 Oct 2021 ' },
    { temp: 7, date: '12 Oct 2021 ' },
    { temp: 8, date: '13 Oct 2021 ' },
    { temp: 11, date: '14 Oct 2021 ' },
    { temp: 11, date: '15 Oct 2021 ' },
    { temp: 10, date: '16 Oct 2021 ' },
    { temp: 11, date: '17 Oct 2021 ' },
    { temp: 12, date: '18 Oct 2021 ' },
    { temp: 10, date: '19 Oct 2021 ' },
    { temp: 8, date: '20 Oct 2021 ' },
    { temp: 2, date: '21 Oct 2021 ' },
    { temp: 3, date: '22 Oct 2021 ' },
    { temp: 5, date: '23 Oct 2021 ' },
    { temp: 6, date: '24 Oct 2021 ' },
    { temp: 6, date: '25 Oct 2021 ' },
    { temp: 3, date: '26 Oct 2021 ' },
    { temp: 2, date: '27 Oct 2021 ' },
    { temp: 0, date: '28 Oct 2021 ' },
    { temp: 3, date: '29 Oct 2021 ' },
    { temp: 6, date: '30 Oct 2021 ' },
    { temp: 7, date: '31 Oct 2021 ' },
    { temp: 6, date: '1 Nov 2021 ' },
    { temp: 9, date: '2 Nov 2021 ' },
    { temp: 11, date: '3 Nov 2021 ' },
    { temp: 9, date: '4 Nov 2021 ' },
    { temp: 10, date: '5 Nov 2021 ' },
    { temp: 8, date: '6 Nov 2021 ' },
    { temp: 5, date: '7 Nov 2021 ' },
    { temp: 6, date: '8 Nov 2021 ' },
    { temp: 5, date: '9 Nov 2021 ' },
    { temp: 6, date: '10 Nov 2021 ' },
    { temp: 1, date: '11 Nov 2021 ' },
    { temp: 1, date: '12 Nov 2021 ' },
    { temp: -2, date: '13 Nov 2021 ' },
    { temp: 0, date: '14 Nov 2021 ' },
    { temp: 3, date: '15 Nov 2021 ' },
    { temp: 2, date: '16 Nov 2021 ' },
    { temp: -2, date: '17 Nov 2021 ' },
    { temp: -2, date: '18 Nov 2021 ' },
    { temp: -2, date: '19 Nov 2021 ' },
    { temp: 1, date: '20 Nov 2021 ' },
    { temp: 3, date: '21 Nov 2021 ' },
    { temp: 1, date: '22 Nov 2021 ' },
    { temp: 1, date: '23 Nov 2021 ' },
    { temp: 5, date: '24 Nov 2021 ' },
    { temp: 0, date: '25 Nov 2021 ' },
    { temp: 1, date: '26 Nov 2021 ' },
    { temp: -1, date: '27 Nov 2021 ' },
    { temp: 3, date: '28 Nov 2021 ' },
    { temp: 3, date: '29 Nov 2021 ' },
    { temp: 5, date: '30 Nov 2021 ' },
    { temp: 3, date: '1 Dec 2021 ' },
    { temp: 1, date: '2 Dec 2021 ' },
    { temp: -1, date: '3 Dec 2021 ' },
    { temp: -2, date: '4 Dec 2021 ' },
    { temp: 0, date: '5 Dec 2021 ' },
    { temp: 1, date: '6 Dec 2021 ' },
    { temp: 1, date: '7 Dec 2021 ' },
    { temp: 1, date: '8 Dec 2021 ' },
    { temp: 3, date: '9 Dec 2021 ' },
    { temp: 4, date: '10 Dec 2021 ' },
    { temp: 1, date: '11 Dec 2021 ' },
    { temp: 2, date: '12 Dec 2021 ' },
    { temp: 1, date: '13 Dec 2021 ' },
    { temp: 0, date: '14 Dec 2021 ' },
    { temp: -2, date: '15 Dec 2021 ' },
    { temp: 0, date: '16 Dec 2021 ' },
    { temp: 2, date: '17 Dec 2021 ' },
    { temp: 1, date: '18 Dec 2021 ' },
    { temp: 2, date: '19 Dec 2021 ' },
    { temp: 1, date: '20 Dec 2021 ' },
    { temp: 2, date: '21 Dec 2021 ' },
    { temp: -3, date: '22 Dec 2021 ' },
    { temp: -5, date: '23 Dec 2021 ' },
    { temp: -7, date: '24 Dec 2021 ' },
    { temp: -8, date: '25 Dec 2021 ' },
    { temp: -6, date: '26 Dec 2021 ' },
    { temp: -4, date: '27 Dec 2021 ' },
    { temp: -2, date: '28 Dec 2021 ' },
    { temp: -3, date: '29 Dec 2021 ' },
    { temp: -5, date: '30 Dec 2021 ' },
    { temp: -4, date: '31 Dec 2021 ' },
    { temp: -3, date: '1 Jan 2022 ' },
    { temp: 0, date: '2 Jan 2022 ' },
    { temp: -2, date: '3 Jan 2022 ' },
    { temp: -4, date: '4 Jan 2022 ' },
    { temp: 0, date: '5 Jan 2022 ' },
    { temp: -1, date: '6 Jan 2022 ' },
    { temp: 0, date: '7 Jan 2022 ' },
    { temp: 3, date: '8 Jan 2022 ' },
    { temp: 1, date: '9 Jan 2022 ' },
    { temp: 1, date: '10 Jan 2022 ' },
    { temp: 0, date: '11 Jan 2022 ' },
    { temp: 1, date: '12 Jan 2022 ' },
    { temp: 0, date: '13 Jan 2022 ' },
    { temp: -1, date: '14 Jan 2022 ' },
    { temp: -3, date: '15 Jan 2022 ' },
    { temp: -3, date: '16 Jan 2022 ' },
    { temp: -5, date: '17 Jan 2022 ' },
    { temp: -8, date: '18 Jan 2022 ' },
    { temp: -6, date: '19 Jan 2022 ' },
    { temp: -3, date: '20 Jan 2022 ' },
    { temp: -5, date: '21 Jan 2022 ' },
    { temp: -6, date: '22 Jan 2022 ' },
    { temp: -4, date: '23 Jan 2022 ' },
    { temp: -2, date: '24 Jan 2022 ' },
    { temp: -3, date: '25 Jan 2022 ' },
    { temp: -3, date: '26 Jan 2022 ' },
    { temp: -1, date: '27 Jan 2022 ' },
    { temp: -3, date: '28 Jan 2022 ' },
    { temp: -6, date: '29 Jan 2022 ' },
    { temp: -6, date: '30 Jan 2022 ' },
    { temp: -4, date: '31 Jan 2022 ' },
    { temp: -1, date: '1 Feb 2022 ' },
    { temp: -2, date: '2 Feb 2022 ' },
    { temp: 0, date: '3 Feb 2022 ' },
    { temp: 2, date: '4 Feb 2022 ' },
    { temp: -1, date: '5 Feb 2022 ' },
    { temp: -3, date: '6 Feb 2022 ' },
    { temp: -1, date: '7 Feb 2022 ' },
    { temp: -5, date: '8 Feb 2022 ' },
    { temp: -2, date: '9 Feb 2022 ' },
    { temp: 2, date: '10 Feb 2022 ' },
    { temp: -1, date: '11 Feb 2022 ' },
    { temp: -4, date: '12 Feb 2022 ' },
    { temp: 1, date: '13 Feb 2022 ' },
    { temp: 0, date: '14 Feb 2022 ' },
    { temp: 0, date: '15 Feb 2022 ' },
    { temp: 1, date: '16 Feb 2022 ' },
    { temp: -2, date: '17 Feb 2022 ' },
    { temp: -2, date: '18 Feb 2022 ' },
    { temp: -1, date: '19 Feb 2022 ' },
    { temp: 0, date: '20 Feb 2022 ' },
    { temp: 2, date: '21 Feb 2022 ' },
    { temp: 1, date: '22 Feb 2022 ' },
    { temp: 1, date: '23 Feb 2022 ' },
    { temp: 4, date: '24 Feb 2022 ' },
    { temp: 5, date: '25 Feb 2022 ' },
    { temp: 4, date: '26 Feb 2022 ' },
    { temp: 3, date: '27 Feb 2022 ' },
    { temp: 2, date: '28 Feb 2022 ' },
    { temp: 3, date: '1 Mar 2022 ' },
    { temp: 5, date: '2 Mar 2022 ' },
    { temp: 6, date: '3 Mar 2022 ' },
    { temp: 2, date: '4 Mar 2022 ' },
    { temp: -1, date: '5 Mar 2022 ' },
    { temp: -2, date: '6 Mar 2022 ' },
    { temp: -4, date: '7 Mar 2022 ' },
    { temp: -2, date: '8 Mar 2022 ' },
    { temp: 1, date: '9 Mar 2022 ' },
    { temp: 0, date: '10 Mar 2022 ' },
    { temp: -1, date: '11 Mar 2022 ' },
    { temp: -3, date: '12 Mar 2022 ' },
    { temp: -3, date: '13 Mar 2022 ' },
    { temp: -4, date: '14 Mar 2022 ' },
    { temp: -3, date: '15 Mar 2022 ' },
    { temp: -3, date: '16 Mar 2022 ' },
    { temp: -4, date: '17 Mar 2022 ' },
    { temp: -2, date: '18 Mar 2022 ' },
    { temp: -1, date: '19 Mar 2022 ' },
    { temp: -1, date: '20 Mar 2022 ' },
    { temp: -7, date: '21 Mar 2022 ' },
    { temp: -8, date: '22 Mar 2022 ' },
    { temp: -1, date: '23 Mar 2022 ' },
    { temp: -3, date: '24 Mar 2022 ' },
    { temp: -2, date: '25 Mar 2022 ' },
    { temp: -1, date: '26 Mar 2022 ' },
    { temp: -1, date: '27 Mar 2022 ' },
    { temp: -1, date: '28 Mar 2022 ' },
    { temp: -2, date: '29 Mar 2022 ' },
    { temp: 0, date: '30 Mar 2022 ' },
    { temp: 3, date: '31 Mar 2022 ' },
    { temp: 5, date: '1 Apr 2022 ' },
    { temp: 9, date: '2 Apr 2022 ' },
    { temp: 7, date: '3 Apr 2022 ' },
    { temp: 7, date: '4 Apr 2022 ' },
    { temp: 6, date: '5 Apr 2022 ' },
    { temp: 7, date: '6 Apr 2022 ' },
    { temp: 8, date: '7 Apr 2022 ' },
    { temp: 7, date: '8 Apr 2022 ' },
    { temp: 7, date: '9 Apr 2022 ' },
    { temp: 6, date: '10 Apr 2022 ' },
    { temp: 10, date: '11 Apr 2022 ' },
    { temp: 4, date: '12 Apr 2022 ' },
    { temp: 3, date: '13 Apr 2022 ' },
    { temp: 2, date: '14 Apr 2022 ' },
    { temp: 3, date: '15 Apr 2022 ' },
    { temp: 5, date: '16 Apr 2022 ' },
    { temp: 6, date: '17 Apr 2022 ' },
    { temp: 9, date: '18 Apr 2022 ' },
    { temp: 8, date: '19 Apr 2022 ' },
    { temp: 7, date: '20 Apr 2022 ' },
    { temp: 7, date: '21 Apr 2022 ' },
    { temp: 7, date: '22 Apr 2022 ' },
    { temp: 7, date: '23 Apr 2022 ' },
    { temp: 8, date: '24 Apr 2022 ' },
    { temp: 11, date: '25 Apr 2022 ' },
    { temp: 13, date: '26 Apr 2022 ' },
    { temp: 13, date: '27 Apr 2022 ' },
    { temp: 13, date: '28 Apr 2022 ' },
    { temp: 13, date: '29 Apr 2022 ' },
    { temp: 12, date: '30 Apr 2022 ' },
    { temp: 12, date: '1 May 2022 ' },
    { temp: 8, date: '2 May 2022 ' },
    { temp: 8, date: '3 May 2022 ' },
    { temp: 11, date: '4 May 2022 ' },
    { temp: 7, date: '5 May 2022 ' },
    { temp: 7, date: '6 May 2022 ' },
    { temp: 8, date: '7 May 2022 ' },
    { temp: 6, date: '8 May 2022 ' },
    { temp: 6, date: '9 May 2022 ' },
    { temp: 7, date: '10 May 2022 ' },
    { temp: 7, date: '11 May 2022 ' },
    { temp: 6, date: '12 May 2022 ' },
    { temp: 8, date: '13 May 2022 ' },
    { temp: 7, date: '14 May 2022 ' },
    { temp: 13, date: '15 May 2022 ' },
    { temp: 10, date: '16 May 2022 ' },
    { temp: 10, date: '17 May 2022 ' },
    { temp: 10, date: '18 May 2022 ' },
    { temp: 9, date: '19 May 2022 ' },
    { temp: 8, date: '20 May 2022 ' },
    { temp: 8, date: '21 May 2022 ' },
    { temp: 8, date: '22 May 2022 ' },
    { temp: 10, date: '23 May 2022 ' },
    { temp: 10, date: '24 May 2022 ' },
    { temp: 9, date: '25 May 2022 ' },
    { temp: 9, date: '26 May 2022 ' },
    { temp: 11, date: '27 May 2022 ' },
    { temp: 12, date: '28 May 2022 ' },
    { temp: 15, date: '29 May 2022 ' },
    { temp: 16, date: '30 May 2022 ' },
    { temp: 17, date: '31 May 2022 ' },
    { temp: 17, date: '1 Jun 2022 ' },
    { temp: 18, date: '2 Jun 2022 ' },
    { temp: 19, date: '3 Jun 2022 ' },
    { temp: 20, date: '4 Jun 2022 ' },
    { temp: 19, date: '5 Jun 2022 ' },
    { temp: 19, date: '6 Jun 2022 ' },
    { temp: 18, date: '7 Jun 2022 ' },
    { temp: 16, date: '8 Jun 2022 ' },
    { temp: 15, date: '9 Jun 2022 ' },
    { temp: 16, date: '10 Jun 2022 ' },
    { temp: 15, date: '11 Jun 2022 ' },
    { temp: 16, date: '12 Jun 2022 ' },
    { temp: 17, date: '13 Jun 2022 ' },
    { temp: 16, date: '14 Jun 2022 ' },
    { temp: 16, date: '15 Jun 2022 ' },
    { temp: 16, date: '16 Jun 2022 ' },
    { temp: 16, date: '17 Jun 2022 ' },
    { temp: 17, date: '18 Jun 2022 ' },
    { temp: 17, date: '19 Jun 2022 ' },
    { temp: 17, date: '20 Jun 2022 ' },
    { temp: 18, date: '21 Jun 2022 ' },
    { temp: 17, date: '22 Jun 2022 ' },
    { temp: 14, date: '23 Jun 2022 ' },
    { temp: 14, date: '24 Jun 2022 ' },
    { temp: 15, date: '25 Jun 2022 ' },
    { temp: 14, date: '26 Jun 2022 ' },
    { temp: 13, date: '27 Jun 2022 ' },
    { temp: 16, date: '28 Jun 2022 ' },
    { temp: 17, date: '29 Jun 2022 ' },
    { temp: 18, date: '30 Jun 2022 ' },
    { temp: 18, date: '1 Jul 2022 ' },
    { temp: 17, date: '2 Jul 2022 ' },
    { temp: 16, date: '3 Jul 2022 ' },
    { temp: 15, date: '4 Jul 2022 ' },
    { temp: 16, date: '5 Jul 2022 ' },
    { temp: 15, date: '6 Jul 2022 ' },
    { temp: 17, date: '7 Jul 2022 ' },
    { temp: 17, date: '8 Jul 2022 ' },
    { temp: 19, date: '9 Jul 2022 ' },
    { temp: 21, date: '10 Jul 2022 ' },
    { temp: 20, date: '11 Jul 2022 ' },
    { temp: 20, date: '12 Jul 2022 ' },
    { temp: 20, date: '13 Jul 2022 ' },
    { temp: 19, date: '14 Jul 2022 ' },
    { temp: 16, date: '15 Jul 2022 ' },
    { temp: 19, date: '16 Jul 2022 ' },
    { temp: 19, date: '17 Jul 2022 ' },
    { temp: 20, date: '18 Jul 2022 ' },
    { temp: 20, date: '19 Jul 2022 ' },
    { temp: 20, date: '20 Jul 2022 ' },
    { temp: 19, date: '21 Jul 2022 ' },
    { temp: 17, date: '22 Jul 2022 ' },
    { temp: 16, date: '23 Jul 2022 ' },
    { temp: 15, date: '24 Jul 2022 ' },
    { temp: 15, date: '25 Jul 2022 ' },
    { temp: 17, date: '26 Jul 2022 ' },
    { temp: 18, date: '27 Jul 2022 ' },
    { temp: 18, date: '28 Jul 2022 ' },
    { temp: 20, date: '29 Jul 2022 ' },
    { temp: 19, date: '30 Jul 2022 ' },
    { temp: 19, date: '31 Jul 2022 ' },
  ];
}
