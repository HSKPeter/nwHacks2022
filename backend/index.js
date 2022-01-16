const express = require('express');
const { open_ai_api_key } = require("./api-keys");
const fetch = require('node-fetch');
const cors = require('cors')

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

//connect to database and import functions 
let db = require("./connect_db");
let tables = require("./create_tables");


app.get('/', (req, res) => {
  res.send('Hello World!')
});

// OK: Report a lost item (image)
app.post('/items-lost', async (req, res) => {
  console.log(req.body);
  const name = "wallet";
  // const date = tables.formatting_date(new Date());
  const lat = null;
  const lon = null;
  const transport = "49";
  const image_url = "http://www.google.com/JHSJnewj28";

  await tables.insert_lost_items(name, date, lat, lon, transport, image_url);
  res.sendStatus(200);
});

// OK: Retrieve a list of found items
app.get('/items-found', async (req, res) => {
  const itemsFound = await tables.get_list_lost_items();
  console.log(itemsFound)
  //res.sendStatus(200); //send({ data: JSON.stringify(itemsFound) })
  res.send({ data: JSON.stringify(itemsFound) })
});



// OK: Report a found item (image)
app.post('/items-found', async (req, res) => {
  console.log(req.body);
  const name = "wallet";
  const date = tables.formatting_date(new Date());
  const lat = null;
  const lon = null;
  const transport = "49";
  const image_url = "http://www.google.com/JHSJnewj28";

  await tables.insert_found_items(name, date, lat, lon, transport, image_url);

  res.sendStatus(200);
});

// Search for item
app.post('/search', async (req, res) => {
  const { keywords } = req.body;
  console.log(keywords)
  if (typeof keywords !== "string") {
    res.sendStatus(500).send({ message: "Keyword must be a string." });
    return;
  }

  const hashtags_dict = await tables.get_list_all_hashtag();

  let hashtags = [];


  hashtags_dict.forEach((obj) => {
    hashtags.push(obj.name);
  });

  const data = {
    "documents": hashtags,
    "query": keywords
  }
  const response = await fetch('https://api.openai.com/v1/engines/davinci/search', {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${OPEN_AI_API_KEY}` }
  });
  const body = await response.json();
  console.log(body)
  const scores = body.map(item => item.score);

  hashtags = hashtags.map((hashtag, index) => {
    return {
      text: hashtag,
      score: scores[index]
    }
  }).sort(sortNumbersInDescendingOrder);

  const result = [];
  const ceilingNumber = 10;
  for (const hashtag of hashtags){

  }

  res.send({ data: hashtags });
  // res.sendStatus(200);
});



app.listen(port, () => {
  console.log(`Listening at PORT ${port}`)
});

function sortNumbersInDescendingOrder(num1, num2) {
  return num2 - num1;
}