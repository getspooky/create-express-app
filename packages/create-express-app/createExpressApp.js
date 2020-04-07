/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const path = require('path');
const chalk = require('chalk');
const { Command } = require('commander');
const { exec } = require('child_process');
const compareVersions = require('compare-versions');
const dns = require('dns');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const os = require('os');

/**
 * @export
 * @desc Check Node.js version
 * @function
 * @name checkNodeVersion
 * @param {Number} minimalNodeVersion
 * @returns {Promise}
 */
exports.checkNodeVersion = function (minimalNodeVersion) {
  return new Promise((resolve, reject) => {
    exec('node --version', (err, stdout) => {
      const nodeVersion = stdout.trim();
      if (err) {
        reject(new TypeError(err));
      } else if (compareVersions(nodeVersion, minimalNodeVersion) === -1) {
        reject(
          new Error(
            'You are running Node ' +
              nodeVersion +
              '.\n' +
              'Create Express App requires Node ' +
              minimalNodeVersion +
              ' or higher. \n' +
              'Please update your version of Node.'
          )
        );
      }
      resolve('Node version compatible');
    });
  });
};
