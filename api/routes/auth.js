const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//REGISTER

router.post("/register", async (req,res) =>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, 'pass').toString(),

    });

    try{
        const user = await newUser.save();
        res.sratus(201).json(user)
    }catch(error){
        res.status(500).json(err);
    }
});

module.exports = router;