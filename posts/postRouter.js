const express = require('express');
const posts = require('./postDb');

const router = express.Router();

// Get all posts
router.get('/', (req, res) => {
  posts
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Something went horribly wrong! ' + err.message });
    });
});

// Get a specific post
router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

// Delete a post
router.delete('/:id', validatePostId, (req, res) => {
  posts
    .remove(req.params.id)
    .then(post => {
      res.status(200).json({ message: 'Post deleted succesfully' });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Your request could not be excecuted! ' + err.message
      });
    });
});

// Update a post
router.put('/:id', [validatePostId, validatePost], (req, res) => {
  posts
    .update(req.params.id, req.body)
    .then(postToUpdate => {
      res.status(201).json(postToUpdate);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Your request could not be processed! ' + err.message
      });
    });
});

// Custom middleware
function validatePostId(req, res, next) {
  posts
    .getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: 'This post does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Your request could not be processed. ' + err.message
      });
    });
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length && req.body.text) {
    next();
  } else if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing post data' });
  } else {
    res.status(400).json({ message: 'missing required text field' });
  }
}

module.exports = router;
