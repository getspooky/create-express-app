/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

function validator(name) {
  return name !== '';
}

module.exports = [{
    message: "Template name?",
    type: "input",
    name: "name",
    validate: validator
  },
  {
    message: "Template url?",
    type: "input",
    name: "link",
    validate: validator
  }, {
    message: "Template description?",
    type: "input",
    name: "description",
    validate: validator
  },
  {
    message: "Template version?",
    type: "input",
    name: "version",
    validate: validator
  },
]
