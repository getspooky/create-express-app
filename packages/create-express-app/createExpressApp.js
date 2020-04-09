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
const inquirer = require('inquirer');
const {
  exec
} = require('child_process');
const compareVersions = require('compare-versions');
const validateProjectName = require('validate-npm-package-name');
const fs = require('fs-extra');
const os = require('os');

/**
 * @export
 * @desc Check Node.js version
 * @function
 * @name checkNodeVersion
 * @param {String} minimalNodeVersion
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

/**
 * @export
 * @desc Check NPM version
 * @function
 * @name checkNPMVersion
 * @param {String} minimalNPMVersion
 * @returns {Promise}
 */
exports.checkNPMVersion = function (minimalNPMVersion) {
  return new Promise((resolve, reject) => {
    exec('npm --version', (err, stdout) => {
      const npmVersion = stdout.trim();
      if (err) {
        reject(new TypeError(err));
      } else if (compareVersions(npmVersion, minimalNPMVersion) === -1) {
        reject(
          new TypeError(
            `You need NPM v${minimalNPMVersion} or above but you have v${npmVersion}`
          )
        );
      }
      resolve('NPM version compatible');
    });
  });
};

/**
 * @export
 * @desc Check Yarn version
 * @function
 * @name checkYarnVersion
 * @param {String} minimalYarnVersion
 * @returns {Promise}
 */
exports.checkYarnVersion = function (minimalYarnVersion) {
  return new Promise((resolve, reject) => {
    exec('yarn --version', (err, stdout) => {
      const yarnVersion = stdout.trim();
      if (err) {
        reject(new TypeError(err));
      } else if (compareVersions(yarnVersion, minimalYarnVersion) === -1) {
        reject(
          new TypeError(
            `You need Yarn v${minimalYarnVersion} or above but you have v${yarnVersion}`
          )
        );
      }
      resolve('Yarn version compatible');
    });
  });
};


/**
 * @export
 * @desc Check GitHub repository is cloned.
 * @function
 * @name checkIfRepositoryIsCloned
 * @returns {Promise}
 */
exports.checkIfRepositoryIsCloned = function () {
  return new Promise((resolve, reject) => {
    exec('git remote -v', (err, stdout) => {
      if (err) {
        reject(new TypeError(err));
      }

      const isRepositoryCloned = stdout
        .split(/\n/)
        .map((line) => line.trim())
        .filter((line) => line.startsWith('origin'))
        .filter((line) => new RegExp(/create-express-app\.git/).test(line));

      if (!isRepositoryCloned) {
        reject(new TypeError('create-express-app repository not found'));
      }

      resolve(isRepositoryCloned.length);
    });
  });
};

/**
 * @export
 * @desc Init Git repository.
 * @function
 * @name initGitRepository
 * @returns {Promise}
 */
exports.initGitRepository = function () {
  return new Promise((resolve, reject) => {
    exec('git init', (err, stdout) => {
      if (err) {
        reject(new TypeError(err));
      } else {
        resolve(stdout);
      }
    });
  });
};

/**
 * @export
 * @desc Install Packages using NPM.
 * @function
 * @name installPackages
 * @param {string} strategy
 * @returns {Promise}
 */
exports.installPackages = function (strategy = 'npm') {
  return new Promise((resolve, reject) => {
    exec(`${strategy} install`, (err, stdout) => {
      console.log('Installing packages. This might take a couple of minutes.');

      if (err) {
        reject(new TypeError(err));
      } else {
        resolve(stdout);
      }
    });
  });
};

/**
 * @export
 * @desc Check create-express-app name.
 * @function
 * @name checkAppName
 * @param {string} appName
 * @returns {Promise}
 */
exports.checkAppName = function (appName) {
  return new Promise((resolve, reject) => {
    const validationResult = validateProjectName(appName);
    if (!validationResult.validForNewPackages) {
      reject(
        `Cannot create a project named ${chalk.green(
          `"${appName}"`
        )} because of npm naming restrictions:\n`
      );
    }
    resolve(`${appName} accepted`);
  });
};

/**
 * @exports
 * @desc Init Express Application.
 * @function
 * @name initExpressApp
 * @param {string} appName
 * @returns {Promise}
 */
exports.initExpressApp = function (appName) {
  checkAppName(appName).then(response => {
     
  });
}

/**
 * @export
 * @desc Kill Current Process.
 * @function
 * @name killProcess
 * @returns {void}
 */
exports.killProcess = function () {
  console.log(chalk.blue('Done!'));
  process.exit(0);
}
