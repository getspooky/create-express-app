/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const ip = require('ip');
const { exec } = require('child_process');
const chalk = require('chalk');

const DEFAULT_PORT = parseInt(process.env.PORT) || 4200;
const HOST = process.env.HOST || '0.0.0.0';
const divider = chalk.gray('\n-----------------------------------');

checkInstalledPackage('nodemon')
  // We attempt to run node js server on given port
  .then(() => runNodeServer('src/App.js'))
  .then(() => {
    console.log(`Server started ! ${chalk.green('✓')}`);
    console.log(`
       ${chalk.bold('Access URLs:')}${divider}
        Localhost: ${chalk.magenta(`http://${HOST}:${DEFAULT_PORT}`)}
        LAN: ${chalk.magenta(`http://${ip.address()}:${DEFAULT_PORT}`)}
        ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  })
  .catch((err) => {
    console.log(chalk.red(err.message));
  });

/**
 * @internal
 * @desc Check if $X package was installed globally.
 * @function
 * @name checkInstalledPackage
 * @param {String} packageName
 * @returns {Promise}
 */
function checkInstalledPackage(packageName) {
  return new Promise((resolve, reject) => {
    exec('npm list -g ' + packageName, (err, stdout) => {
      if (err)
        reject(
          new TypeError(
            'express-scripts require ' +
              packageName +
              ' package to be installed globally' +
              '\n' +
              'Please run npm install -g nodemon'
          )
        );
      resolve(true);
    });
  });
}

/**
 * @internal
 * @desc Run node js server.
 * @function
 * @name runNodeServer
 * @param {string} rootFile
 * @returns {Promise}
 */
function runNodeServer(rootFile) {
  return new Promise((resolve, reject) => {
    exec('nodemon ' + rootFile, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve('Running server...');
      }
    });
  });
}
