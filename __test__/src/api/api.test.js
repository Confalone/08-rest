'use strict';

const {server} = require('../../../src/app.js');
const supertest = require('supertest');
const mockRequest = supertest(server);
const apiURL = `/api/v1/puppys`;

describe('app', () => {

  it('returns ID for GET /?id=foo', () => {
        
    return mockRequest
      .get(apiURL + '?id=foo')
      .then(data => {
        console.log('DATA RESPOMSE ::' , data.text);
        expect(data.text).toBe('ID: foo');
      });
  });

  it('returns the body content on a POST request.', ()=> {
    let thing = {ID:123};
    return mockRequest
      .post(apiURL)
      .send (thing)
      .then (data => {
        console.log('data', data.text);
        expect(JSON.parse(data.text)).toEqual({'ID':123});
      });
  });
  
  it('returns bad request 400 when not given a query', () => {

    return mockRequest
      .get(apiURL)
      .catch(err => {
        expect(err.response.text).toBe('Sorry go that way');
      });
  });

  it('returns bad request 400 when not given a body', () => {

    return mockRequest
      .get(apiURL)
      .catch(err => {
        expect(err.response.text).toBe('Sorry go that way');
        expect(err.status).toBe(400);
      });
  });
});