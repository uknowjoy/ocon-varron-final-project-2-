require("dotenv").config();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const DB = {};
DB.mongoose = mongoose;
DB.url = process.env.MONGOURL;

DB.user = require("./user")(mongoose);
DB.auth = require("./auth")(mongoose);
DB.blacklist = require("./blacklist")(mongoose);
DB.activity = require("./activity")(mongoose);
DB.comment = require("./comment")(mongoose);

module.exports = DB;