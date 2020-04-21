# create-express-app

<sub>Created and maintained with ❤️ by <a href="https://github.com/getspooky">getspooky</a>.</sub>

Create Express App is a command-line interface tool that helps you to initialize, develop, and maintain your Expressjs applications.
It offers a modern build setup with no configuration. At the same time, it still offers the flexibility to tweak the config of each tool.
Create Express App works on macOS, Windows, and Linux.<br>

- If something doesn’t work, please file an [issue](https://github.com/getspooky/create-express-app/issues).<br>

# Quick Overview

Installation is done using the npm install command:

```sh
npm install -g create-expressjs-app
```

```sh
create-expressjs-app init my-project
cd my-project
```

Runs the app in development mode.
Open http://localhost:4200 to view it in the browser.

```sh
npm run start
```

Inside my-project directory, it will generate the initial project structure and install the transitive dependencies:

```
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

## Running Tests

Create Expressjs App uses Jest as its test runner

```sh
npm run test
```

## Requirements

create-expressjs-app has a few requirements you should be aware of before installing:

- Node.js >= 8.0.0
- npm >= 6.10.3

## Contributing

We encourage you to contribute to create-expressjs-app! Please check out the [Contributing](/Contributing.md) to create-expressjs-app guide for guidelines about how to proceed.

## Security Vulnerabilities

If you discover a security vulnerability within create-expressjs-app, please send an e-mail to `Yasser Ameur El Idrissi` via getspookydev@gmail.com . All security vulnerabilities will be promptly addressed.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## License

Please see [License File](LICENSE.md) for more information.

<p align="center">
 <img src="docs/media/coding.jpeg" width="200" height="200" />
</p>

<div align="center">
   Happy Coding ❤️
</div>
