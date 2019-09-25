const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update
};

function find() {
  return db('dadjokes').select('id', 'dadjoke');
}

function findBy(filter) {
  return db('dadjokes').where(filter);
}

async function add(dadjoke) {
  const [id] = await db('dadjokes').insert(dadjoke);

  return findById(id);
}

function update(changes, id) {
    return db('dadjokes').where({ id }).update(changes)
    .then(count => {
      return findById(id);
    });
}

function findById(id) {
  return db('dadjokes')
    .where({ id })
    .first();
}