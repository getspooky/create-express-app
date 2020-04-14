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
const {
  Command
} = require('commander');

const {
  version,
  name
} = require('./package.json');

const supportedScripts = [
  'start', 'build', 'test'
];

const program = new Command(name);
program.version(version);

program
  .arguments('<script>')
  .alias('sc')
  .description('Create Express App Scripts')
  .action(function (script) {
    // checking if script does not include supported express artisan scripts.   
    if (!supportedScripts.includes(script)) {
      console.log(
        chalk.red('Unknown script ' + script)
      );
      console.log(
        chalk.yellow('Supported express artisan scripts : ' +
          supportedScripts.join(', '))
      );
      console.log(
        'Link : ' +
        chalk.underline.blue(
          'https://github.com/getspooky/create-express-app/issues'
        )
      );
    }
    
  });

program.parse(process.argv);
