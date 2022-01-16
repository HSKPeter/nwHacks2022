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
  const { description, lossTime, location, contact } = req.body;
  const name = description;
  const date = tables.formatting_date(new Date(lossTime));
  const lat = null;
  const lon = null;
  const transport = null;
  const image_url = null;

  await tables.insert_lost_items(name, date, lat, lon, transport, image_url);
  res.sendStatus(200);
});

// OK: Retrieve a list of found items
app.get('/items-found', async (req, res) => {
  const itemsFound = await tables.get_list_found_items();
  console.log(itemsFound)
  //res.sendStatus(200); //send({ data: JSON.stringify(itemsFound) })
  res.send({ data: itemsFound })
});



// OK: Report a found item (image)
app.post('/items-found', async (req, res) => {
  console.log(req.body);
  const { imagePath, description, foundTime, location, contact, hashtags } = req.body;
  const name = description;
  const date = tables.formatting_date(new Date(foundTime));
  const lat = null;
  const lon = null;
  const transport = null;
  const image_url = imagePath;

  await tables.insert_found_items(name, date, lat, lon, transport, image_url, contact);

  var id = await db.async_query(`SELECT LAST_INSERT_ID()`);
  id = id[0]['LAST_INSERT_ID()']

  var map_hashtag = new Map();
  for (var h of hashtags) {
    map_hashtag.set(h, 0); //suppose to be isObject for the second argument    
  }

  await tables.add_hashtag(id, map_hashtag, 0);

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
    "documents": hashtags.slice(1),
    "query": keywords
  }
  const response = await fetch('https://api.openai.com/v1/engines/davinci/search', {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${open_ai_api_key}` }
  });
  const body = await response.json();
  console.log(body)
  const scores = body.data.map(item => item.score);

  hashtags = hashtags.map((hashtag, index) => {
    return {
      text: hashtag,
      score: scores[index]
    }
  }).sort(sortNumbersInDescendingOrder);

  var result = [];

  const ceilingNumber = 100;
  for (const hashtag of hashtags){
    const current_num = 0;
    let sql = `SELECT hashtag_id FROM hashtags WHERE name='${hashtag}'`;
    result = await tables.async_query(sql);
    let result_id = result[0].hashtag_id;
    
    var appeared_id = []; 
    var start_stop = [current_num, ceilingNumber];
    select_found_items_by_hashtag_id(result_id, start_stop, appeared_id, result);

    if (result.length >= 100) {
      break;
    } 
  }
  //return result
  res.send({ data: result });
  // res.sendStatus(200);
});

async function select_found_items_by_hashtag_id(hashtag_id, start_stop, appeared_id, result) {
  let num_start = start_stop[0];
  let num_stop = start_stop[1];
  let total_num = num_stop - num_start;

  let sql = `SELECT found_items_id FROM mapping_found WHERE hashtag_id='${hashtag_id}' LIMIT ${num_start}, ${num_stop}`;
  let result_id_raw = await db.async_query(sql);
  let result_id = [];
  result_id_raw.forEach((obj) => {
    let id = obj.found_items_id;
    
    if (!appeared_id.includes(id)) {
      appeared_id.push(id);
      result_id.push(id);
    }
  });
  var result_item;
  // result_id.forEach(async(obj) => {
  //   sql = `SELECT * FROM found_items WHERE found_items_id='${obj}'`;
  //   result_item = await db.async_query(sql);
  //   result.push(result_item[0]);
  //   console.log(result);
  // });

  for (const obj of result_id) {
    sql = `SELECT * FROM found_items WHERE found_items_id='${obj}'`;
    result_item = await db.async_query(sql);
    result.push(result_item[0]);
    //console.log(result);
  }
  //console.log(result);
} 

app.listen(port, () => {
  console.log(`Listening at PORT ${port}`)
});

function sortNumbersInDescendingOrder(num1, num2) {
  return num2 - num1;
}

module.exports = {select_found_items_by_hashtag_id};