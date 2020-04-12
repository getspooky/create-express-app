/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

// The 'unhandledRejection' event is useful for detecting and keeping track of
// promises that were rejected whose rejections have not yet been handled.
process.on('unhandledRejection', err => {
  throw err;
});

const args = process.argv.slice(1);

if (['start', 'build', 'test'].indexOf(args[0]) !== -1)
  require(args[1].trim() + 'ExpressApp');
else
  throw new TypeError('Unknown script');
