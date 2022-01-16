const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Report a lost item (image)

// Report a found item (image)

// Retrieve a list of found items


// function to call Azure API for hashtags and description of images

// 



app.listen(port, () => {
  console.log(`Listening at PORT ${port}`)
});