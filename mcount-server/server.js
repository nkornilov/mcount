const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 2000;

app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, function (error, database) {
  if (error) {
    return console.log(`error while connecting to db: ${error}`);
  } else {
    require('./app/routes')(app, database);
    app.listen(port, () => console.log(`server was started at PORT:${2000}`));
  }
});
