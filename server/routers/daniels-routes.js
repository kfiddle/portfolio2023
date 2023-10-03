const express = require('express');

const router = express.Router();
const axios = require('axios');


const searchComposerAndWork = 'https://api.daniels-orchestral.com/v3/search';
const userId = '6434';
const token = '47702c57767e6e7b';

// router.get("/", gigController.getAllGigs);

router.post('/', async (req, res, next) => {
  const { composer, work } = req.body;

  if (composer === null || work === null) {
    return next({
      log: 'error retrieving movie list in movieController.js',
      status: 500,
      message: { err: 'Unable to list movies' },
    });
  }

  try {
    const response = await axios.get(searchComposerAndWork, {
      headers: { composer, work, userId, token },
    });

    res.status(201).json({ work_detail: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
