const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const formsRouters = require('./routes/formsRouters.js')
mongoose.set("strictQuery", false);


const app = express();
app.use(cors())
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );
mongoose.connect(DB).then(() => {
    // console.log(con.connections);
    console.log('Db is Connected');
  });
port = process.env.port;

app.use(express.json({ limit: '10kb'}));
app.use('/forms',formsRouters);


const server = app.listen(port, () => {
  console.log(`App is listening at port ${port}...`);
});
