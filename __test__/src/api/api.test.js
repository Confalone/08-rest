'use strict';

const superagent = require('superagent');
const app = require('./../../../src/api/api.js');
describe ('app', () => {
  beforeAll(() => {
    app.start(3000);
  });
  afterAll(() => {
    app.stop();
  });

  it ('returns ID for GET /?id=foo', () => {
        
    return superagent
      .get('http:local//3000/v1/api/puppys=ID:123')
      .then(data => {
        expect(data.text).toBe('ID:123');
      });
  });

  it('returns the body content on a POST request.', ()=> {
    let thing = {'ID':'123'};
    return superagent
      .post('http:local//3000/v1/api/puppys')
      .send (thing)
      .then (data => {
        expect(data.text).toBe(`{'ID:123'}`);
      });
  });
  it ('returns bad request 400 when not given a query', () => {

    return superagent
      .get('http:local//3000/v1/api/puppys')
      .catch(err => {
        expect(err.response.text).toBe('Bad Request, needs a query');
      });
  });

  it ('returns bad request 400 when not given a body', () => {

    return superagent
      .get('http:local//3000/v1/api/puppys')
      .catch(err => {
        expect(err.response.text).toBe('Bad Request, needs a body.');
        expect(err.status).toBe(400);
      });
  });
});