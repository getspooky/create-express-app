/*
 * This file is part of the express-artisan package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const chalk = require('chalk');
const path = require('path');
const {
  Command
} = require('commander');

const {
  version,
  name
} = require('./package.json');

// The 'unhandledRejection' event is emitted whenever a Promise is rejected.
process.on('unhandledRejection', err => {
  console.log();
  console.log(
    chalk.red(err.message),
  );
  console.log(
    'Link : ' +
    chalk.underline.blue(
      'https://github.com/getspooky/create-express-app/issues'
    )
  );
  process.exit(0);
});

const supportedScripts = ['start', 'build', 'test'];

const program = new Command(name);
program.version(version);

program
  .arguments('<script>')
  .alias('sc')
  .description('Create Express App Scripts')
  .action(function (script) {
    // checking if given script does not include supported express artisan scripts.
    if (!supportedScripts.includes(script)) {
      console.log(chalk.red('Unknown script ' + script));
      console.log(
        chalk.yellow(
          'Supported express artisan scripts : ' + supportedScripts.join(', ')
        )
      );
      process.exit(0);
    } else {
      // example: start.js
      require(path.join(__dirname, script));
    }
  });

program.parse(process.argv);
