<p align="center">
  <img src="/docs/media/logo.png" alt="create-express-app" style="margin-bottom:20px;margin-top:20px" />
</br>
</p>
<div align="center">
<sub>Created and maintained with ❤️ by  <a href="https://github.com/getspooky">getspooky</a>.</sub>
</div>

# create-express-app

Create Express App is a command-line interface tool that helps you to initialize, develop, and maintain your Expressjs applications.
Create Express App works on macOS, Windows, and Linux.<br>

- If something doesn’t work, please file an [issue](https://github.com/getspooky/create-express-app/issues).<br>
- If you have questions or need help, please ask in our [Spectrum community]().

# Quick Overview

Installation is done using the npm install command:

```sh
npm install -g create-express-app
```

```sh
create-express-app init my-project
cd my-project
```

Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

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

Then open http://localhost:4200/ to see your app.

## Running Tests

Create Express App uses Jest as its test runner

```sh
npm run test
```

## Requirements

create-express-app has a few requirements you should be aware of before installing:

- Node.js >= 8.0.0
- npm >= 6.10.3

## Contributing

We encourage you to contribute to create-express-app! Please check out the [Contributing](/Contributing.md) to create-express-app guide for guidelines about how to proceed.

## Security Vulnerabilities

If you discover a security vulnerability within create-express-app, please send an e-mail to `Yasser Ameur El Idrissi` via getspookydev@gmail.com . All security vulnerabilities will be promptly addressed.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## License

Please see [License File](LICENSE.md) for more information.
