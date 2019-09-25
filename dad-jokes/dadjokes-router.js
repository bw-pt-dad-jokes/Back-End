const router = require('express').Router();
const db = require('../database/db-config.js');
const Jokes = require('../dad-jokes/jokes-model.js');

router.get('/', (req, res) => {
  db('dadjokes')
  .then(dadjoke => {
    res.status(200).json(dadjoke);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Jokes.findById(id)
  .then(dadjoke => {
    if (dadjoke) {
      res.json(dadjoke);
    } else {
      res.status(404).json({ message: 'Could not find joke with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get joke' });
  });
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Jokes.update(changes, id)
  .then(dadjoke => {
    if (dadjoke) {
      res.json({ updated: dadjoke });
    } else {
      res.status(404).json({ message: 'Could not find joke with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update your mess up' });
  });
});

router.delete('/:id', (req, res) => {
  db('dadjokes')
    .where({ id: req.params.id })
    .del()
  .then(count => {
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });
});


module.exports = router;
