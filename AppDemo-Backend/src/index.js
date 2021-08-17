const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { DB } = require('./../database/db');
const apiroutes = require("./routes");

DB().connect();

const app = express()

app.use(bodyParser.json());
app.use(cors())
app.use("/", apiroutes);

app.listen(process.env.PORT || 8000, function () {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || 8000}`
  );
});
