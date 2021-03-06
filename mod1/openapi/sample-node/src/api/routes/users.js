const express = require('express');
const users = require('../services/users');

const router = new express.Router();


/**
 * Creates a user.
 */
router.post('/create', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await users.postUsersCreate(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Standard get request retriving all users
 */
router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await users.getUsers(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Updates a user given a username and new username
 */
router.patch('/update', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await users.patchUsersUpdate(options);
    res.status(200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Deletes a user given a username
 */
router.delete('/delete', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await users.deleteUsersDelete(options);
    res.status(200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

module.exports = router;
