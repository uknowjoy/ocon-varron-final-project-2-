const DB = require('../models')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


exports.login = async function (req, res){
    const { username, password}= req.body;

    const userFind = await DB.user.findOne({username: username});
    
    if ( !userFind ){
        return res.status(404).json({
            message: "Invalid Credentials in Study Buddy.",
          });
    } else if (userFind && (await bcrypt.compare(password, userFind.password))){
        const token = jwt.sign({_id: userFind._id}, process.env.authKey, {
            // expiresIn: "5h",
        });
        
        res.status(200).send({
            messsage: "Login successful Welcome to Study Buddy Portal!",
            token: token
          });
    }
}

exports.passcodeLogin = async function (req, res){
    const {passcode, idNumber} = req.body;

    const userFind = await DB.user.findOne({idNumber: idNumber});

    if ( !userFind ){
        return res.status(404).json({
            message: "Invalid ID Number.",
          });
    } else if (userFind && (await bcrypt.compare(passcode, userFind.passcode))){
        
        return
        // res.status(200).send({
        //     messsage: "Login successful waiting for passcode sign-in!"
        //   });
    }
}

exports.logout = async function (req, res) {
    const blacklist = new DB.blacklist({
      token: req.token,
      idNnumber: req.idNnumber,
    });
    await blacklist.save();
  
    res.status(201).json({
      messsage: `Token Stored, Logout`,
    });
  };

exports.refresh = async function (req, res) {
    console.log("refresh here");
    const userData = req.user;
  
    delete userData.iat;
    delete userData.exp;
    const accessToken = jwt.sign(userData, process.env.checkAuth, {
      expiresIn: "10h",
    });
  
    return res.json({
      token: accessToken,
      user: userData,
    });
  };