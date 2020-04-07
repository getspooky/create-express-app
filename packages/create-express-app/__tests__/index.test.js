/*
 * This file is part of the create-express-app package.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const createExpressApp = require('../createExpressApp');

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

  it('should display message if the npm is compatible', function () {
    return createExpressApp.checkNodeVersion('3.6.0').then((response) => {
      expect(response).toEqual('Node version compatible');
    });
  });

  it('should throw error if the version is not compatible', function () {
    return createExpressApp.checkNodeVersion('7.14.4').catch((error) => {
      expect(error).toBeTruthy();
    });
  });

});
