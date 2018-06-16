'use strict';

const router = require('../lib/router.js');


/**
 * GET Route (/)
 * Accepts an optional "name" query string parameter and says Hello
 * test with httpie:
 *     http http://localhost:8080
 *     http http://localhost:8080?name=John
 */
router.get('/', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';

  let name = req.query.name || '';
  res.write(`Hello ${name}`);
  res.end();
});

router.get('/api/v1/puppys', (req, res) => {
  
  const id = req.query.id;
  
  if(id) {
    res.statusCode = 200;
    res.write(`ID: ${id}`);
  } else {
    res.statusCode = 400;
    res.write(`Sorry go that way`);
  }
  res.end();
});

router.post('/api/v1/puppys', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.write(JSON.stringify(req.body));
  res.end();
});

router.put('/api/v1/puppys', (req, res) => {  
  const id = req.url.query.id;
  
  if(id) {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.write(JSON.stringify(req.body));
  } else {
    res.statusCode = 400;
    res.write(`Sorry go that way`);
  }
  res.end();
});

router.delete('/api/v1/puppys', (req, res) => {  
  const id = req.query.id;
  
  if(id) {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.write(`ID: ${id} has been deleted, thank you.`));
  } else {
    res.statusCode = 400;
    res.write(`Sorry, nothing was deleted.`);
  }
  res.end();
});

module.exports = {};