const express = require('express');
const users = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  users
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Error adding new user. ' + err.message });
    });
});

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
        .json({ message: 'Error retreiving the users: ' + err.message });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  users
    .getUserPosts(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Your request could not be processed. ' + err.message
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  users
    .remove(req.user.id)
    .then(() => {
      res.status(200).json({ message: `user was deleted succesfully` });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'User could not be deleted. ' + err.message });
    });
});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  users
    .getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: 'User id does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Something terrible happened: ' + err.error });
    });
}

function validateUser(req, res, next) {
  if (Object.keys(req.body).length && req.body.name) {
    next();
  } else if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing user data' });
  } else {
    res.status(400).json({ message: 'missing required name field' });
  }
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length) {
    next();
  } else if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing post data' });
  } else {
    res.status(400).json({ message: 'missing required text field' });
  }
}

module.exports = router;
