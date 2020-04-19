/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const chalk = require('chalk');
const ora = require('ora');
const {
  Command
} = require('commander');
const {
  _BANNER,
  _EMOJIS
} = require('./interface');
const {
  killProcess,
  checkNPMVersion,
  checkYarnVersion,
  checkNodeVersion,
  initExpressApp,
  installPackages,
  happyCoding,
} = require('./createExpressApp');

const {
  version,
  name,
  author
} = require('./package.json');
const program = new Command(name);
program.version(version);

/* Check NPM , Yarn and Node Compatibility */
const versionCompatibility = {
  npm: '3.6.0',
  yarn: '1.12.0',
  node: '8.1.0',
};

var spinner = {
  project: ora('🧬 Creating Project...'),
  installPackages: ora('📦 Installing packages...'),
};

_BANNER('Create Express App');

console.log(
  `Created and maintained with ${chalk.bold.red(_EMOJIS.HEART)}  by ${author}`
);
console.log();
console.log('Tools Version ' + chalk.green(version));

program
  .command('init <projectName>')
  .alias('ci')
  .description('init create-express-app project')
  .option(
    '-d, --directory <project-directory>',
    'Setup the default folder structures to be used in the Project'
  )
  .option('-u', '--use <strategy>', 'Selecting a package manager')
  .action(function (projectName, action) {
    // Cheking NPM , Yarn and Node versions.
    Promise.all([
        checkNPMVersion(versionCompatibility.npm),
        checkYarnVersion(versionCompatibility.yarn),
        checkNodeVersion(versionCompatibility.node),
      ])
      .then(() => {
        initExpressApp(projectName, action.directory)
          .then(() => spinner.project.start())
          .then(() => {
            spinner.project.stop();
            spinner.installPackages.start();
            // When you create a new app, the CLI will use npm to install dependencies.
            // If you have npm installed, but would prefer to use yarn ,
            // you can append `--with yarn` or `-w yarn` to the creation command.
            installPackages(action.directory, action.use || 'npm');
          })
          .then(() => {
            spinner.installPackages.stop();
            happyCoding(action.directory);
          });
      })
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
