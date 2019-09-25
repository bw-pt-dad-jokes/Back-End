const router = require('express').Router();
const db = require('../database/db-config.js');

router.get('/', (req, res) => {
  db('dadjokes')
  .then(dadjoke => {
    res.status(200).json(dadjoke);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

router.post('/api/jokes', (req, res) => {
  db('dadjokes').insert(req.body)
  .then(ids => {
    const id = ids[0];

    db('dadjokes')
      .where({ id })
      .first()
    .then(dadjoke => {
      res.status(201).json(dadjoke);
    });
  })
  .catch(error => {
    res.status(500).json(error);
  });
});
module.exports = router;
