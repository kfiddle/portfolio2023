const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());

const danielsRoutes = require('./routers/daniels-routes.js');

const searchComposerAndWork = 'https://api.daniels-orchestral.com/v3/search';
const userId = '6434';
const token = '47702c57767e6e7b';

// requires composer, work, userId, token

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/daniels_query/', danielsRoutes)

// app.use('/composer_and_work_by_name', (req, res, next) => {
  // console.log('Received request:', req.body);
  // const { composer, work } = req.body;

  // if (composer === null || work === null) {
  //   return next({
  //     log: 'error retrieving movie list in movieController.js',
  //     status: 500,
  //     message: { err: 'Unable to list movies' },
  //   });
  // }

  // try {
  //   const response = await axios.get(searchComposerAndWork, {
  //     headers: { composer, work, userId, token },
  //   });

  //   res.status(201).json({ work_detail: response.data });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'An error occurred' });
  // }
// });

app.use('/testfetch', async (req, res) => {
  const danielsSingleWork = 'https://api.daniels-orchestral.com/v3/fetch';

  try {
    const response = await axios.get(danielsSingleWork, {
      headers: {
        // composer: 'David Diamond',
        work: '6348',
        userId,
        token,
      },
    });

    // Handle the response data here
    console.log(response.data);

    res.status(201).json({ work_detail: response.data });
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.use('*', (req, res, next) => {
  return next({
    log: 'No route configured for this endpoint',
    status: 404,
    message: { err: 'Page not found' },
  });
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);

  return res.status(errorObj.status).json({ message: errorObj.message });
});

app.listen(3002, () => console.log('Listening on PORT: 3002'));
