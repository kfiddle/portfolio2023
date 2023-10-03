const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios'); // Import Axios

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/testfetch', async (req, res) => {
  const danielsUrl = 'https://api.daniels-orchestral.com/v3/search';
  const danielsSingleWork = 'https://api.daniels-orchestral.com/v3/fetch'
  const userId = '6434';
  const token = '47702c57767e6e7b';

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

    res.status(201).json({ live: 'yes we are good' });
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3002, () => console.log('Listening on PORT: 3002'));
