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
const { Command } = require('commander');
const { _BANNER, _EMOJIS } = require('./interface');
const {
  killProcess,
  checkNPMVersion,
  checkYarnVersion,
  checkNodeVersion,
  initExpressApp,
} = require('./createExpressApp');

const { version, name, author } = require('./package.json');
const program = new Command(name);
program.version(version);

/* Check NPM , Yarn and Node Compatibility */
const versionCompatibility = {
  npm: '3.6.0',
  yarn: '1.12.0',
  node: '8.1.0',
};

var spinner = {
  check: ora('🎛 Checking Environment...'),
  project: ora('🧬 Creating Project...'),
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
  .action(function (projectName, action) {
    spinner.check.start();
    // Cheking NPM , Yarn and Node versions.
    Promise.all([
      checkNPMVersion(versionCompatibility.npm),
      checkYarnVersion(versionCompatibility.yarn),
      checkNodeVersion(versionCompatibility.node),
    ])
      .then(([npm, yarn, node]) => {
        spinner.check.stop();
        console.log(npm.concat(chalk.green('✓')));
        console.log(yarn.concat(chalk.green('✓')));
        console.log(node.concat(chalk.green('✓')));
        initExpressApp(projectName, action.directory)
          .then(() => spinner.project.start())
          .then(() => spinner.project.stop());
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
