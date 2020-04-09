/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { Command } = require('commander');
const { killProcess } = require('./createExpressApp');

const { version ,name } = require('./package.json');
const program = new Command(name);
program.version(version);
program.command('init <projectName>')
  .alias('ci')
  .description('init create-express-app project')
  .option("-d, --directory <project-directory>", 'Setup the default folder structures to be used in the Project')
  .action(function(projectName, action) {
    Promise.all([

    ]).catch(err => {
      console.log(chalk.red(err.message));
      console.log(
        'If you feel you have found a security issue or concern with create-express-app'
        + '\n'
        + 'Please use the following link to create a new issue: '
      );
      console.log(chalk.underline.blue('https://github.com/getspooky/create-express-app/issues'));
      killProcess();
    })
  });

program.parse(process.argv);
