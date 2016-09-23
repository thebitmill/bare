'use strict';

const PWD = process.cwd();

const p = require('path');

const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = {
  plugins: [
    nodeResolve({
      jsnext: true,  // Default: false
      main: true,  // Default: true
      browser: true,  // Default: false
      preferBuiltins: false,
    }),

    commonjs({
      include: [
        p.join(PWD, 'node_modules/**'),
      ],
      exclude: [],
      extensions: ['.js'],
      sourceMap: true,  // Default: true
    }),
  ],
  sourceMap: true,
  dest: p.join(PWD, 'public/js/app.js'),
  entry: 'src/app.js',
  format: 'iife',
};
