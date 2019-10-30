const express = require('express');
const helmet = require('helmet');
const server = express();

const userRouter = require('./users/userRouter');

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', logger, userRouter);

//custom middleware
function logger(req, res, next) {
  const { method, url } = req;
  console.log({
    method,
    url,
    timeStamp: Date.now()
  });
  next();
}

module.exports = server;
