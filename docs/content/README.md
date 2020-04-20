<b>🕧 Last modified</b>: 2020-03-19 17h 28m

# Getting Started

Create Express App is a command-line interface tool that helps you to initialize, develop and maintain your Expressjs applications. It offers a modern build setup with no configuration. At the same time, it still offers the flexibility to tweak the config of each tool.

# Requirements

create-express-app has a few requirements you should be aware of before installing:

- Node.js >= 8.0.0
- npm >= 6.10.3

# Creating an App

You’ll need to have Node >= 8.10 on your local development machine
Installation is done using the npm install command:

```sh
npm install -g create-express-app
```

```sh
create-express-app init my-project
```

You will be prompted to pick a template.
Supported template are :

- cra-template-es5
- cra-template-es6
- cra-template-typescript

Each template comes with a basic `Jest` + `ESLint` setup.

> You can find a list of available templates by searching for `"cra-template-\*"` on npm.

Then Runs the app in development mode and open http://localhost:4200/ to see your app.

# Selecting a package manager

When you create a new app, the CLI will use npm to install dependencies. If you have npm installed, but would prefer to use yarn , you can append `--use yarn` or `-u yarn` to the creation command. For example:

```sh
create-express-app init my-project --use yarn
```

# Folder Structure

Inside my-project directory, it will generate the initial project structure and install the transitive dependencies:

```sh
my-project
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
|   ├── logo64.png
|   ├── logo128.png
│   └── logo256.png
└── src
    ├── App.js
    └── App.test.js
```

# Available Scripts

Inside the newly created project, you can run some built-in commands:

| Script | Description                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------- |
| start  | Runs the app in development mode.                                                                 |
| test   | Runs the test in an interactive mode                                                              |
| build  | Convert `TypeScript` or `ECMAScript 2015+` code into a backwards compatible version of JavaScript |

# Wrinting Template

In addition to the templates provided with create-express-app, you may also build your own custom templates.
Templates are typically stored in the `packages/` directory.

# Registering Template

You may also manually register templates by adding its `version` , `link` , `description` to the `packages/create-express-app/template.json` file.

```json
{
  "cra-template-es5": {
    "version": "1.0.0",
    "link": "https://example.com/cra-template-es5.tgz",
    "description": "The base template for Create Express App."
  },
  "cra-template-es6": {
    "version": "1.0.0",
    "link": "https://example.com/cra-template-es6.tgz",
    "description": "ES6 template for Create Express App"
  },
  "cra-template-typescript": {
    "version": "1.0.0",
    "link": "https://example.com/cra-template-typescript.tgz",
    "description": "TypeScript template for Create Express App."
  }
}
```

# Testing

Testing is a group of techniques to determine the correctness of the application under the predefined script but, testing cannot find all the defect of application. The main intent of testing is to detect failures of the application so that failures can be discovered and corrected. It does not demonstrate that a product functions properly under all conditions but only that it is not working in some specific conditions.

## Running Tests

Create Express App uses `Jest` as its test runner. Jest is an open source project maintained by Facebook. Its strengths are:

- it’s fast
- it can perform snapshot testing
- it’s opinionated, and provides everything out of the box without requiring you to make choices

Jest is a tool very similar to Mocha, although they have differences:

- Mocha is less opinionated, while Jest has a certain set of conventions
- Mocha requires more configuration, while Jest works usually out of the box, thanks to being opinionated
- Mocha is older and more established, with more tooling integrations

## Filename Conventions

Jest will look for test files with any of the following popular naming conventions:

- Files with `.test.js` suffix.
- Files with `.spec.js` suffix.

## Example

```js
const request = require('supertest');
const app = require('./App');

/**
 * A basic test example.
 */
test('should return 200', function () {
  request(app)
    .get('/static/index.html')
    .expect('Content-Type', 'text/html; charset=UTF-8')
    .expect(200)
    .end(function (err, res) {
      if (err) throw err;
    });
});
```

# Security

create-express-app takes web security very seriously. This means including features to protect application makers from common issues `CSRF`,`XSS`,`Click Jacking` , `DNS prefetching` etc.

# Security Vulnerabilities

If you discover a security vulnerability within create-express-app, please send an e-mail to Yasser Ameur El Idrissi via `getspookydev@gmail.com` . All security vulnerabilities will be promptly addressed.

# How Can I Help?

- Contribute to the core repository.
- Ask your employer to use create-express-app in projects.
- Make a tutorial that you explain create-express-app.

# Bug Report

If you've found a problem in `create-express-app` which is not a security risk, do a search on GitHub under Issues in case it has already been reported. If you are unable to find any open GitHub issues addressing the problem you found, your next step will be to open a new one. (See the next section for reporting security issues.) your issue should contain a title and a clear description of the issue. You should also include as much relevant information as possible and a code sample that demonstrates the issue. The goal of a bug report is to make it easy for yourself - and others - to replicate the bug and develop a fix. Remember, bug reports are created in the hope that others with the same problem will be able to collaborate with you on solving it. Do not expect that the bug report will automatically see any activity or that others will jump to fix it. Creating a bug report serves to help yourself and others start on the path of fixing the problem.

# License

create-express-app is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
