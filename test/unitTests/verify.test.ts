process.env.NODE_ENV = 'test';

import chai from 'chai';
import app from './../../src/app';
import chaiHttp = require('chai-http');
import { endpoints, messages } from './../../src/utils/constants';
import mocks from './../mocks/users';
import knex from './../../src/config/db/knex';

chai.use(chaiHttp);

describe('verify tests', () => {
  beforeEach(async function () {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async function () {
    await knex.migrate.rollback();
  });

  it('should return: user verified', async () => {
    const token = 'testToken';
    const res = await chai
      .request(app)
      .get(`${endpoints.auth}/verify/${token}`);
    chai.expect(res.status).to.equal(200);
  });

  it('should return: token invalid or expired', async () => {
    const token = 'testTokenInvalid';
    const res = await chai
      .request(app)
      .get(`${endpoints.auth}/verify/${token}`);
    chai.expect(res.status).to.equal(400);
  });
});
