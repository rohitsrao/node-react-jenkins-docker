const app = require('./app');
const supertest = require('supertest');

test('GET / returns 200', async () => {
  await supertest(app)
    .get('/')
    .expect(200);
});

test('GET / contains Calculator as title', async () => {
  await supertest(app)
    .get('/')
    .then((response) => {
      expect(response.text).toContain('<title>Calculator</title>');
    });
});
