/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const CFonts = require('cfonts');
const { project } = require('./package.json');

CFonts.say(project, {
  font: 'block', // define the font face
  align: 'left', // define text alignment
  colors: ['cyan'], // define all colors
  background: 'black', // define the background color
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: '0', // define how many character can be on one line
});
