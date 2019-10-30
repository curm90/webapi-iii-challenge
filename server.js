const express = require('express');
const helmet = require('helmet');
const server = express();

const userRouter = require('./users/userRouter');

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter);

//custom middleware

function logger(req, res, next) {}

module.exports = server;
