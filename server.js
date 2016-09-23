'use strict';

const chalk = require('chalk');
const hirestime = require('hirestime');
const { Server: StaticServer } = require('node-static');

const staticServer = new StaticServer('./public');
const port = process.env.PORT || 1337;

require('http').createServer((request, response) => {
  request.on('end', () => {
    const timer = hirestime();

    response.on('finish', () => {
      let statusCode = response.statusCode;

      if (statusCode < 300) {
        statusCode = chalk.green(statusCode);
      } else if (statusCode < 400) {
        statusCode = chalk.cyan(statusCode);
      } else {
        statusCode = chalk.red(statusCode);
      }

      console.info([request.method, request.url, statusCode, timer()].join(' '));
    });

    staticServer.serve(request, response);
  }).resume();
}).listen(port, () => {
  console.info(`Listening on ${port}`);
});
