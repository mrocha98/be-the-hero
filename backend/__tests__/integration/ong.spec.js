const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ong', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  afterEach(async () => {
    await connection('ongs').truncate();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    expect.hasAssertions();

    const res = await request(app)
      .post('/ongs')
      .send({
        name: 'test',
        email: 'contato@test.com',
        whatsapp: '11900000000',
        city: 'São Paulo',
        uf: 'SP',
      });

    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toHaveLength(8);
  });
});
