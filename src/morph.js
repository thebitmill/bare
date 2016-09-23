import { select, selectAll } from 'd3-selection';
import { geoAlbers } from 'd3-geo';
import 'd3-transition/build/d3-transition.js';
import { interpolateArray } from 'd3-interpolate';

import polygon from './coords';

const width = 960;
const height = 500;

const projection = geoAlbers()
  .rotate([120, 0])
  .center([0, 37.7])
  .scale(2700);

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const coordinates0 = polygon.coordinates[0].map(projection);
const path = svg.append('path');
const d0 = 'M' + coordinates0.join('L') + 'Z';
const nodeCount = coordinates0.length;
const coords = [
  [50,25],
  [0,100],
  [100,100],
];
const nbr = Math.floor(nodeCount / coords.length);
const rest = nodeCount % coords.length;
const interCoords = [];

for (let i = 0; i < coords.length; i++) {
  const ip = interpolateArray(coords[i], coords[(i + 1) % coords.length]);

  for (let j = 0; j < (i > rest - 1 ? nbr : nbr + 1); j++) {
    interCoords.push(ip(j/nbr).slice(0));
  }
}

const path4 = svg.append('path');

const d4 = `M${interCoords.map((coords) => coords.map((coord) => coord).join(',')).join('L')}Z`;

path4.attr('d', d4)
  .transition()
  .duration(5000)
  .attr('d', d0)
  //.transition()
  //.delay(5000)
  //.attr('d', d0);
