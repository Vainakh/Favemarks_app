const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

app.use(express.json()); //use .json(), not .urlencoded
app.use(express.static('public'));

//parse applicaton/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
//parse application/json
app.use(bodyParser.json());

const bookmarksController = require('./controllers/bookmarks.js');

app.use('/bookmarks', bookmarksController);

mongoose.connect('mongodb://localhost:27017/bookmarks', {
  useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.once('open', () => {
    console.log('connected to mongod...');
  });

app.listen(3000, () => {
  console.log('listening...')
})