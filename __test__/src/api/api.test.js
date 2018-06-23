'use strict';

const superagent = require('superagent');
const app = require('./../../../src/app.js');
require('dotenv').config();
const apiURL = `http://localhost:${process.env.PORT}/api/v1/puppys`;

describe('app', () => {
  beforeAll(() => {
    app.start(process.env.PORT);
  });
  afterAll(() => {
    app.stop();
  });

  it('returns ID for GET /?id=foo', () => {
        
    return superagent
      .get(apiURL + '?id=foo')
      .then(data => {
        console.log('DATA RESPOMSE ::' , data.text);
        expect(data.text).toBe('ID: foo');
      });
  });

  it('returns the body content on a POST request.', ()=> {
    let thing = {ID:123};
    return superagent
      .post(apiURL)
      .send (thing)
      .then (data => {
        console.log('data', data.text);
        expect(JSON.parse(data.text)).toEqual({'ID':123});
      });
  });
  
  it('returns bad request 400 when not given a query', () => {

    return superagent
      .get(apiURL)
      .catch(err => {
        expect(err.response.text).toBe('Sorry go that way');
      });
  });

  it('returns bad request 400 when not given a body', () => {

    return superagent
      .get(apiURL)
      .catch(err => {
        expect(err.response.text).toBe('Sorry go that way');
        expect(err.status).toBe(400);
      });
  });
});