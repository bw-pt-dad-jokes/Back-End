const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const connectSessionKnex = require('connect-session-knex');

const authenticate = require('../auth/auth-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../dad-jokes/dadjokes-router.js');
const db = require('../database/db-config.js');

const server = express();

const KnexSessionStore = connectSessionKnex(session);

const sessionConfig = {
  name: 'authenticate jokes',
  secret: 'these jokes are very private',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true 
  },
  resave: false,
  saveUninitialized: false,
  // where do we store our sessions?
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/jokes', jokesRouter);


server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;