process.env.NODE_ENV = 'test';

import chai from 'chai';
import app from './../../src/app';
import chaiHttp = require('chai-http');
import { endpoints, messages } from './../../src/utils/constants';
import knex from './../../src/config/db/knex';
import mocks from './../mocks/credentials';

chai.use(chaiHttp);

describe('login tests', () => {
  beforeEach(async function () {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async function () {
    await knex.migrate.rollback();
  });

  it('should return: user logged', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/login`)
      .send(mocks.correctCredentials);
    chai.expect(res.status).to.equal(200);
  });

  it('should return: bad credentials', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/login`)
      .send(mocks.incorrectCredentials);
    chai.expect(res.body.message).to.equal(messages().badCredentials);
  });

  it('should return: user not verified', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/login`)
      .send(mocks.notVerifiedCredentials);
    chai.expect(res.body.message).to.equal(messages().notVerified);
  });

  it('should return: user not enable', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/login`)
      .send(mocks.disabledCredentials);
    chai.expect(res.body.message).to.equal(messages().userDisabled);
  });
});
