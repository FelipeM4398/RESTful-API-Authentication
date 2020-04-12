process.env.NODE_ENV = 'test';

import chai from 'chai';
import app from './../../src/app';
import chaiHttp = require('chai-http');
import { endpoints, messages } from './../../src/utils/constants';
import mocks from './../mocks/users';
import knex from './../../src/config/db/knex';

chai.use(chaiHttp);

describe('signup tests', () => {
  beforeEach(async function () {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async function () {
    await knex.migrate.rollback();
  });

  it('should return: user created', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.userValid);
    chai.expect(res.status).to.equal(201);
  });

  it('should return: identification already exists', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.identificationExists);
    chai
      .expect(res.body.message)
      .to.equal(messages.identificationAlreadyExists);
  });

  it('should return: email already exists', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.emailExists);
    chai.expect(res.body.message).to.equal(messages.emailAlreadyExists);
  });

  it('should return: identification is required', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.withoutIdentification);
    chai.expect(res.body.message).to.equal(messages.identificationIsRequired);
  });

  it('should return: name is required', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.withoutName);
    chai.expect(res.body.message).to.equal(messages.nameIsRequired);
  });

  it('should return: last name is required', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.withoutLastName);
    chai.expect(res.body.message).to.equal(messages.lastNameIsRequired);
  });

  it('should return: email is required', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.withoutEmail);
    chai.expect(res.body.message).to.equal(messages.emailIsRequired);
  });

  it('should return: password is required', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.withoutPassword);
    chai.expect(res.body.message).to.equal(messages.passwordIsRequired);
  });

  it('should return: invalid identification', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.identificationInvalid);
    chai.expect(res.body.message).to.equal(messages.identificationIsInvalid);
  });

  it('should return: invalid name', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.nameInvalid);
    chai.expect(res.body.message).to.equal(messages.nameIsInvalid);
  });

  it('should return: invalid last name', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.lastNameInvalid);
    chai.expect(res.body.message).to.equal(messages.lastNameIsInvalid);
  });

  it('should return: invalid phone', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.phoneInvalid);
    chai.expect(res.body.message).to.equal(messages.phoneIsInvalid);
  });

  it('should return: invalid email', async () => {
    const res = await chai
      .request(app)
      .post(`${endpoints.auth}/signup`)
      .send(mocks.emailInvalid);
    chai.expect(res.body.message).to.equal(messages.emailIsInvalid);
  });
});
