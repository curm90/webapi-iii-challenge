const express = require('express');
const users = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {
  users
    .get()
    .then(usersList => {
      if (usersList) {
        res.status(200).json(usersList);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Error retreiving the users: ' + err.error });
    });
});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
