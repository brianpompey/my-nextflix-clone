const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");


//CREATE

router.post("/", verify, async (req,res)=>{
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body);

        try{
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed to do that !");
    }
});

//UPDATE

router.post("/", verify, async (req,res)=>{
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body);

        try{
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        }catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed to do that !");
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

router.get("/", verify, async (req,res)=>{
    const query = req.query.new;
    if(req.user.isAdmin){
        try{
            const users = query ? await User.find().limit(10) : await User.find();
            res.status(200).json(users);
        } catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not allowed to see that!!");
    }
});


//GET_USER_STATS

router.get("/stats" async(req,res)=>{
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    try{
        const data = await User.aggregate([
            {
                $project:{
                    month: {$month: "$createdAt"},
                },
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum:1},
                },
            },
        ]);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router