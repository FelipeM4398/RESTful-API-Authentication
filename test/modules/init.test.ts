process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp = require('chai-http');
import app from './../../src/app';

chai.use(chaiHttp);

describe('basic tests', () => {
  it('should return: resource not found', async () => {
    const res = await chai.request(app).get('/dontexists');
    chai.expect(res.status).to.equal(404);
  });
});
