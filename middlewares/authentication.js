const jwt = require("jsonwebtoken");
require("dotenv").config();
const DB = require("../models");

exports.authentication = async function (req, res, next){
    if (req.headers.authorization == null) {
        return res.status(400).send({
          message: "No token",
        });
      }
    let token = null;

    // try {
    //     token = req.headers.authorization.split(" ")[1];
    //     const blackListedToken = await DB.blacklist.findOne({ token: token });
    //     if (blackListedToken) {
    //         return res.status(401).send({
    //           message: "Invalid token",
    //         });
    //       } else {
    //         console.log("Token found.");
    //       }
    // } catch (error){
    //     console.error("An error occurred:", error);
    //     return res.status(500).send({
    //       message: "Internal Server Error",
    //     });
    // } 

    try {
        token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.authKey, (err, decoded) => {
          if (err) {
            if (err.name === "TokenExpiredError") {
              return res.status(401).send({ message: "Token has expired" });
            } else {
              return res.status(401).send({ message: "Unauthorized" });
            }
          }
          req.user = decoded;
          req.token = token;
          req._id = decoded._id;
          next();
        });
      } catch (error) {
        return res.status(401).send({ message: "Unauthorized token" });
      }

}