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
const {
  get
} = require('node-emoji');

// This is a silly little command line tool for sexy fonts in the console.
exports._BANNER = function (appName) {
  CFonts.say(appName, {
    font: 'block', // define the font face
    align: 'left', // define text alignment
    colors: ['cyan'], // define all colors
    background: 'transparent', // define the background color
    letterSpacing: 1, // define letter spacing
    lineHeight: 1, // define the line height
    space: true, // define if the output text should have empty lines on top and on the bottom
    maxLength: '0', // define how many character can be on one line
  });
};

// simple emoji support for create-express-app projects
exports._EMOJIS = {
  HEART: get('heart'),
  COFFEE: get('coffee'),
  BEER: get('beer'),
  BROKEN_HEART: get('broken_heart'),
  CRYING: get('crying_cat_face'),
  HEART_EYES: get('heart_eyes_cat'),
  JOY: get('joy_cat'),
  KISSING: get('kissing_cat'),
  SCREAM: get('scream_cat'),
  ROCKET: get('rocket'),
  SMIRK: get('smirk_cat'),
  RAISED_HANDS: get('raised_hands'),
  POINT_RIGHT: get('point_right'),
  ZAP: get('zap'),
  BOOM: get('boom'),
  PRAY: get('pray'),
  PACKAGE: get('📦'),
  CHECKING_ENV: get('🧬'),
  CLONE: get('📥'),
  REGISTER: get('🔌')
};
