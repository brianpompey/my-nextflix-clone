const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//UPDATE

router.put("/:id", verify, async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, 'pass').toString()
        }

        try{
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                   $set: req.body, 
                },
                { new: true }
            );
            res.status(200).json(updateUser);
        } catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You can update only your account!");
    }
});

//DELETE

router.delete("/:id", verify, async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
        } catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You can only delete your account!");
    }
});


//GET

router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc; 
        res.status(200).json(info);
    } catch(err){
        res.status(500).json(err);
    }
});

//GET_ALL

//GET_USER_STATS


module.exports = router