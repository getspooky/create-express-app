/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const createExpressApp = require('../createExpressApp');

// mocking functions.
createExpressApp.initGitRepository = jest.fn(() => Promise.resolve('Git initialization'));
createExpressApp.installPackages = jest.fn(() => Promise.resolve('Packages installed'));

describe('Testing create-express-app package', function () {
  it('should display message if the version is compatible', function () {
    return createExpressApp.checkNodeVersion('8.1.0').then((response) => {
      expect(response).toEqual('Node version compatible');
    });
  });

  it('should throw error if the version is not compatible', function () {
    return createExpressApp.checkNodeVersion('12.8.0').catch((error) => {
      expect(error).toBeTruthy();
    });
  });

  it('should display message if the NPM is compatible', function () {
    return createExpressApp.checkNPMVersion('3.6.0').then((response) => {
      expect(response).toEqual('NPM version compatible');
    });
  });

  it('should throw error if the NPM version is not compatible', function () {
    return createExpressApp.checkNPMVersion('7.14.4').catch((error) => {
      expect(error).toBeTruthy();
    });
  });

  it('should return true if the repository is already cloned from github', function () {
    return createExpressApp.checkIfRepositoryIsCloned().then(response => {
      expect(response).toBe(2);
    });
  });

  it('should init Git repository', function () {
    return createExpressApp.initGitRepository().then(response => {
      expect(response).toEqual('Git initialization');
    });
  });


  it('should init Install packages using NPM or Yarn strategy', function () {
    return createExpressApp.installPackages('npm').then(response => {
      expect(response).toEqual('Packages installed');
    });
  });

});
