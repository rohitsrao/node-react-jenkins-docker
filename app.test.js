const app = require('./app');
const supertest = require('supertest');

test('GET / returns 200', async () => {
  await supertest(app)
    .get('/')
    .expect(200);
});
