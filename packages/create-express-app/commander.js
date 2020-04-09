/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const chalk = require('chalk');
const { Command } = require('commander');
const { killProcess , checkNPMVersion } = require('./createExpressApp');

const { version ,name } = require('./package.json');
const program = new Command(name);
program.version(version);

/* Check NPM , Yarn and Node Compatibility */
const versionCompatibility = {
  npm: '3.6.0',
  yarn: '1.12.0',
  node: '8.1.0'
};

program.command('init <projectName>')
  .alias('ci')
  .description('init create-express-app project')
  .option("-d, --directory <project-directory>", 'Setup the default folder structures to be used in the Project')
  .action(function(projectName, action) {
    Promise.all([
       checkNPMVersion(versionCompatibility.npm),
    ]).catch(err => {
      console.log(chalk.red(err.message));
      console.log(
        'If you feel you have found a security issue or concern with create-express-app'
        + '\n'
        + 'Please use the following link to create a new issue: '
      );
      console.log('Link : '+chalk.underline.blue('https://github.com/getspooky/create-express-app/issues'));
      killProcess();
    })
  });

program.parse(process.argv);
