/*
 * This file is part of the express-artisan package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const inquirer = require('inquirer');
const jest = require('jest');
const jestConfig = require('jest-config-create-express-app');

// Many of the options shown below can also be used together to
// run tests exactly the way you want
// learn more : https://jestjs.io/docs/en/cli.html#
const supportedJestOptions = [
  '--cache', // Whether to use the cache
  '--changedFilesWithAncestor', // Runs tests related to the current changes and the changes made in the last commit.
  '--changedSince', // Runs tests related to the changes since the provided branch
  '--clearCache', // Deletes the Jest cache directory and then exits without running tests.
  '--colors', // Forces test results output highlighting even if stdout is not a TTY.
  '--debug', // Print debugging info about your Jest config.
  '--detectOpenHandles', // Attempt to collect and print open handles preventing Jest from exiting cleanly.
  '--expand', // Use this flag to show full diffs and errors instead of a patch.
  '--forceExit', // Force Jest to exit after all tests have completed running
  '--json', // Prints the test results in JSON.
  '--watch', // Watch files for changes and rerun tests related to changed files
  '--watchAll', // Watch files for changes and rerun all tests when something changes
];

/**
 * @internal
 * @desc Start App Testing.
 * @function
 * @name test
 * @returns {void}
 */
(function test() {
  return inquirer
    .prompt([{
      type: 'checkbox',
      name: 'options',
      message: 'Many of the options shown below can also be used together to run tests exactly the way you want',
      choices: [...supportedJestOptions],
    }, ])
    .then((answers) => {
      //
      const options =
        ' --config=' + JSON.stringify(jestConfig) + ' ' + answers.options.join(' ');
      return jest
        .run(options)
        .then((success) => {
          console.log(success);
        })
        .catch((failure) => {
          console.error(failure);
        });
    });
})();
