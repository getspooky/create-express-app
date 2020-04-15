/*
 * This file is part of the express-artisan package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const {
  exec
} = require('child_process');

// Compiling spinner
const spinner = ora('📦 Compiling...');

/**
 * @internal
 * @desc TypeScript Build Setup.
 * @object
 * @name tsBuild
 * @returns {Object}
 */
var tsBuild = {
  configPath: path.join(process.cwd(), 'tsconfig.json'),
  compile: function () {
    return new Promise((resolve, reject) => {
      exec('tsc --project ' + this.configPath, (err, stdout) => {
        if (err) reject(err);
        resolve(stdout);
      });
    });
  },
};

/**
 * @internal
 * @desc ES6 Build Setup.
 * @object
 * @name babelBuild
 * @returns {Object}
 */
var babelBuild = {
  configPath: path.join(process.cwd(), '.babelrc'),
  compile: function () {
    return new Promise((resolve, reject) => {
      exec('babel src --out-dir build ', (err, stdout) => {
        if (err) reject(err);
        resolve(stdout);
      });
    });
  },
};

/**
 * @internal
 * @desc Build TypeScript or ES6 project.
 * @function
 * @name build
 * @returns {void}
 */
(function build() {
  // Checking if the folder contains tsconfig or babel file.
  if (fs.existsSync(tsBuild.configPath)) {
    // loading spinner
    spinner.start();
    tsBuild.compile().then((stdout) => {
      console.log(stdout);
      console.log(
        'TypeScript Project Compiled successfully ' + chalk.green('✓')
      );
      spinner.stop();
    });
  } else if (fs.existsSync(babelBuild.configPath)) {
    // loading spinner
    spinner.start();
    babelBuild.compile().then((stdout) => {
      console.log(stdout);
      console.log('ES6 Project Compiled successfully ' + chalk.green('✓'));
      spinner.stop();
    });
  } else {
    console.log();
    console.log(chalk.red('Something went wrong (: \n'));
    console.log(
      chalk.bold.blue(
        '- If you are using ES6 template make sure to have .babelrc file '
      ) +
      '\n' +
      chalk.bold.blue(
        '- If you are using TypeScript template make sure to have tsconfig.json file'
      )
    );
    console.log();
  }
})();
