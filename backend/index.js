const express = require('express');
const { OPEN_AI_API_KEY } = require("./api-keys");
const fetch = require('node-fetch');

const app = express();
const port = 8080;
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Report a lost item (image)
app.post('/items-lost', async (req, res) => {
  res.sendStatus(200);
});

// Retrieve a list of found items
app.get('/items-found', async (req, res) => {
  const itemsFound = ["Hello World"];
  res.sendStatus(200).send({ data: JSON.stringify(itemsFound) });
});

// Report a found item (image)
app.post('/items-found', async (req, res) => {
  res.sendStatus(200);
});

// Search for item
app.post('/search', async (req, res) => {
  const { keywords } = req.body;
  console.log(typeof keywords)
  if (typeof keywords !== "string") {
    res.sendStatus(500).send({ message: "Keyword must be a string." });
    return;
  }
  let hashtags = [
    "cable",
    "connector",
    "electrical supply",
    "iPhone"
  ]
  const data = {
    "documents": hashtags,
    "query": keywords
  }
  const response = await fetch('https://api.openai.com/v1/engines/davinci/search', {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${OPEN_AI_API_KEY}`}
  });
  const body = await response.json();
  const scores = body.map(item => item.score);
  hashtags = hashtags.map((hashtag, index) => {
    return {
      text: hashtag,
      score: scores[index]
    }
  })

  res.sendStatus(200).send({ data: JSON.stringify(hashtags) });
});



app.listen(port, () => {
  console.log(`Listening at PORT ${port}`)
});