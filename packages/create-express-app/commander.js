/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const chalk = require('chalk');
const inquirer = require('inquirer');
const {
  Command
} = require('commander');
const {
  _BANNER,
  _EMOJIS
} = require('./interface');
const {
  killProcess,
  checkingEnvironment,
  initExpressApp,
  installPackages,
  registerTemplate,
  happyCoding,
} = require('./createExpressApp');

const {
  version,
  name,
  author
} = require('./package.json');
const program = new Command(name);
program.version(version);

_BANNER('Create Express App');

console.log(
  'Created and maintained with ' +
  chalk.bold.red(_EMOJIS.HEART) +
  '  by ' +
  author.nickname +
  chalk.blue('<' + author.email + '>')
);
console.log();
console.log('Tools Version ' + chalk.green(version));

program
  .command('new template')
  .description('Register new template')
  .action(function () {
    registerTemplate();
  });

program
  .command('init <projectName>')
  .alias('ci')
  .description('init create-express-app project')
  .option(
    '-d, --directory <project-directory>',
    'Setup the default folder structures to be used in the Project',
  )
  .option(
    '-u , --use <strategy>',
    'Selecting a package manager'
  )
  .option(
    '-rt , --registerTemplate <register-template>',
    'Registering Template'
  )
  .action(function (projectName, action) {
    //
    let directory = null;

    if (typeof action.directory === 'undefined') {
      console.log();
      console.log(
        chalk.yellow(
          'By default create-express-app uses your current directory'
        )
      );
      directory = process.cwd() + '/';
    } else {
      directory = action.directory;
    }

    let projectPath = directory.concat(projectName);

    if (!directory.endsWith('/')) {
      console.log(chalk.red('Directory should end with slash'));
      killProcess();
    }

    // Cheking NPM , Yarn and Node versions.
    checkingEnvironment()
      .then(() =>
        initExpressApp(projectName, projectPath)
        .then(() =>
          // When you create a new app, the CLI will use npm to install dependencies.
          // If you have npm installed, but would prefer to use yarn ,
          // you can append `--with yarn` or `-w yarn` to the creation command.
          installPackages(projectPath, action.use || 'npm').then((stdout) => {
            console.log(stdout);
            happyCoding(projectPath);
          })
        )
      )
      .catch((err) => {
        console.log();
        console.log(chalk.red(err.message));
        console.log(
          'If you feel have found a security issue or concern with create-express-app' +
          '\n' +
          'Please use the following link to create a new issue: '
        );
        console.log(
          'Link : ' +
          chalk.underline.blue(
            'https://github.com/getspooky/create-express-app/issues'
          )
        );
        killProcess();
      });
  });

program.parse(process.argv);
