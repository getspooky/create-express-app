/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const chalk = require('chalk');
const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const {
  exec
} = require('child_process');
const {
  _EMOJIS
} = require('./interface');
const compareVersions = require('compare-versions');
const validateProjectName = require('validate-npm-package-name');

var spinner = {
  checkingEnv: ora(_EMOJIS.CHECKING_ENV + 'Checking Environment...'),
  project: ora(_EMOJIS.CLONE + ' Creating Project...'),
  installPackages: ora(_EMOJIS.PACKAGE + ' Installing Packages...'),
};


const supportedTemplates = [
  'cra-template-es5',
  'cra-template-typescript',
  'cra-template-es6',
];

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
      console.log();
      console.log('Node version compatible ' + chalk.green('✓'));
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
      console.log();
      console.log('NPM version compatible ' + chalk.green('✓'));
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
      console.log();
      console.log('Yarn version compatible ' + chalk.green('✓'));
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

      if (
        Array.isArray(isRepositoryCloned) &&
        isRepositoryCloned.length === 0
      ) {
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
 * @param {string} directory
 * @param {string} strategy
 * @returns {Promise}
 */
exports.installPackages = function (directory, strategy) {
  return new Promise((resolve, reject) => {
    spinner.installPackages.start();
    exec(`cd ${directory} && ${strategy} install`, (err, stdout) => {
      if (err) {
        reject(new TypeError(err));
      } else {
        spinner.installPackages.stop();
        resolve(stdout);
      }
    });
  });
};

/**
 * @exports
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
    console.log();
    console.log(`${appName} accepted ${chalk.green('✓')}`);
    resolve('Project name accepted');
  });
};

/**
 * @exports
 * @desc Init Express Application.
 * @function
 * @name initExpressApp
 * @param {string} appName
 * @param {string} directory
 * @returns {Promise|exit}
 */
exports.initExpressApp = function (appName, directory) {
  if (typeof directory === 'undefined') {
    console.log();
    console.log(chalk.red('Please specify the project directory'));
    console.log(`Run ${chalk.cyan(`--help`)} to see all options.`);
    module.exports.killProcess();
  }

  if (fs.existsSync(directory)) {
    console.log();
    console.log(
      chalk.red(appName + ' project already exists')
    );
    module.exports.killProcess();
  }

  return Promise.all([
    module.exports.checkAppName(appName),
    module.exports.createExpressTemplate(directory),
  ]);
};

/**
 * @exports
 * @desc Create Express Template.
 * @function
 * @name chooseExpressTemplate
 * @param {string} directory
 * @returns {Promise}
 */
exports.createExpressTemplate = function (directory) {
  console.log();
  return inquirer
    .prompt([{
      type: 'list',
      name: 'template',
      message: 'Please specify a template for the created project',
      choices: supportedTemplates,
    }, ])
    .then((answers) => {
      let getTemplate = require('./template.json');
      return module.exports.getTemplateInstallPackage(
        answers.template,
        directory,
        getTemplate[answers.template].link
      );
    });
};

/**
 * @exports
 * @desc Install Given Template Package.
 * @function
 * @name getTemplateInstallPackage
 * @param {string} template
 * @param {string} dest
 * @param {string} url
 * @returns {Promise}
 */
exports.getTemplateInstallPackage = function (template, dest, url) {
  console.log();
  return new Promise((resolve, reject) => {
    spinner.project.start();
    // make sure that all given templats starts with cra-template-
    // @example cra-template-es6
    if (!supportedTemplates.includes(template))
      reject(new TypeError('The given template does not exists!'));
    if (url.match(/^(https:\/\/github.com).+/) === null)
      reject(
        new TypeError(url + ' should match format : ^(https:\/\/github.com).+')
      );
    // clone specific template from repository
    exec(`git clone -b ${template} ${url} ${dest}/`, (err, stdout) => {
      console.log();
      if (err) {
        reject(new TypeError(err));
      } else {
        spinner.project.stop();
        resolve(stdout);
      }
    });
  });
};

/**
 * @exports
 * @desc Verify installed repository.
 * @function
 * @name verifyRepositoryProcess
 * @returns {Promise}
 */
exports.verifyRepositoryProcess = function () {
  return Promise.all([
    module.exports.checkIfRepositoryIsCloned(),
    module.exports.initGitRepository(),
  ]);
};

/**
 * @exports
 * @desc Express App created successfully.
 * @function
 * @name happyCoding
 * @param {string} directory
 * @returns {void}
 */
exports.happyCoding = function (directory) {
  console.log();
  console.log(chalk.green('Success! App created at ' + directory));
  console.log('Inside that directory, you can run several commands : ');
  console.log(
    chalk.cyan('yarn start') + '\n' + 'Starts the development server.'
  );
  console.log(
    chalk.cyan('yarn test') + '\n' + 'Starts the test runner.' + '\n'
  );
  console.log('Happy Coding ' + _EMOJIS.RAISED_HANDS);
  process.exit(0);
};

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
};
