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
const chalk = require('chalk');
const inquirer = require('inquirer');
const ip = require('ip');
const ora = require('ora');
const supportedProtocols = ['http', 'https'];
// PORT environment variable
const PORT = parseInt(process.env.PORT, 10) || 4200;
// HOST environment variable
const HOST = process.env.HOST || '127.0.0.1';

var divider = chalk.gray('\n-----------------------------------');

// Starting Server Spinner
const spinner = ora('📡 Starting Nodejs Server...');

/**
 * @internal
 * @desc Create Express Server.
 * @function
 * @name start
 * @returns {void}
 */
(function start() {
  return inquirer
    .prompt([{
      type: 'list',
      name: 'protocol',
      message: 'Please specify the protocol!',
      choices: [...supportedProtocols],
    }, ])
    .then(({
      protocol
    }) => {
      spinner.start();
      return require(protocol)
        .createServer(
          require(path.resolve(__dirname, process.cwd(), 'src', 'App'))
        )
        .listen(PORT, function (err) {
          if (err) throw err;
          spinner.stop();
          console.log();
          console.log('Server started ! ' + chalk.green('✓'));
          console.log(`
           ${chalk.bold('Access URLs:')}${divider}
            Localhost: ${chalk.magenta(`http://${HOST}:${PORT}`)}
            LAN: ${chalk.magenta(`http://${ip.address()}:${PORT}`)}
       `);
          console.log(chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`));
        })
    });
})();
