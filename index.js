// Global configuration
require("dotenv").config();
const port = process.env.PORT || 3001;

// Modules
const express = require("express");
const initRoutes = require("./routes");
const cors = require("cors");
const moment = require("moment");


// Express initialization
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

initRoutes(app);

if (process.env.NODE_ENV != "test") {
  const DB = require("./models");
    DB.mongoose
    .connect(DB.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("Connected to MongoDataBase");
      // console.log(process.env.MONGOURL);
    })
    .catch((err) => {
      console.log(err);
    });

  // Running express app
  app.listen(port, () => {
    console.log(`Study Buddy API ${port}`);
    console.log(`Current Date: ${new moment()}`);
  });
}

module.exports = app;
