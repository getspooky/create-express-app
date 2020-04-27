/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const {
  engines
} = require('./package.json');

module.exports = {
  requiredNodeVersion: engines.node.match(/([0-9.]+)/g)[0],
  requiredNpmVersion: engines.npm.match(/([0-9.]+)/g)[0],
  requiredYarnVersion: engines.yarn.match(/([0-9.]+)/g)[0],
};
