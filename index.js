// Import stylesheets
import './style.css';
import * as d3 from 'd3';

const appDiv = document.getElementById('app');

d3.csv(
  'https://raw.githubusercontent.com/bumbeishvili/tech-survey-data/main/2021.csv'
).then((data) => {
  const mappedData = mapData(data);
  console.log(mappedData);
  const result = Chart(mappedData);
  appDiv.appendChild(result);
});

function mapData(data) {
  let map = new Map();
  data.forEach((d) => {
    let values = [];
    if (map.has(d.FromLeargningToJobTime)) {
      values = map.get(d.FromLeargningToJobTime);
    } else {
      map.set(d.FromLeargningToJobTime, values);
    }
    values.push(d);
  });
  const groupedData = map;

  const dataMapped = Array.from(groupedData)
    .map(([key, values]) => {
      return {
        key: key,
        value: values.length,
      };
    })
    .sort((a, b) => (a.value < b.value ? 1 : -1));

  return dataMapped;
}

// Chart function
function Chart(data) {
  // Create elements
  const d3Div = d3.create('div');

  const sum = d3.sum(data, (d) => d.value);

  d3Div
    .selectAll('.bar-div')
    .data(data)
    .join('div')
    .html((d, i) => {
      const p = Math.round((d.value / sum) * 100 * 10) / 10;
      return `
         <div>
             <div style='display:inline-block;width:150px;text-align:right'>${
               d.key
             }</div>
             <div style='margin-left:10px;display:inline-block; width:${
               d.value * 5
             }px; height:10px; background-color:green'></div>
             <div style='display:inline-block;font-size:10px'>${p}%</div>
         </div>
      `;
    });

  return d3Div.node();
}
