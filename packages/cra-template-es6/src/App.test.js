import request from 'supertest';
import app from './App';

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
