const express = require('express');

const router = express.Router();
const axios = require('axios');

const searchComposerAndWork = 'https://api.daniels-orchestral.com/v3/search';
const searchSpecificWork = 'https://api.daniels-orchestral.com/v3/fetch';
const userId = '6434';
const token = '47702c57767e6e7b';


router.post('/by_composer_work', async (req, res, next) => {
  const { composer, work } = req.body;

  if (composer === null || work === null) {
    return next({
      log: 'Either composer or work is missing. (Or both)',
      status: 500,
      message: { err: 'Invalid input received by server' },
    });
  }

  try {
    const response = await axios.get(searchComposerAndWork, {
      headers: { composer, work, userId, token },
    });

    res.status(201).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/work_by_id', async (req, res, next) => {
  const { id: work } = req.body;

  if (work === null) {
    return next({
      log: 'No value received for work id',
      status: 500,
      message: { err: 'Unable to list retrieve work by id' },
    });
  }

  try {
    const response = await axios.get(searchSpecificWork, {
      headers: { work, userId, token },
    });

    res.status(201).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
