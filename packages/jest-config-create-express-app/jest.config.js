/*
 * This file is part of the jest-config-create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const path = require('path');

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  testRegex: '\\.(test|spec)\\.(ts|js)$',
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': path.join(__dirname, 'node_modules/ts-jest'),
  },
  testPathIgnorePatterns: ['/(build|docs|node_modules)/'],
  coverageReporters: ['json', 'lcov'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
