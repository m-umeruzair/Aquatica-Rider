const express = require("express");
const router = express.Router();
const Rider= require('../models/rider')

router.get('/findRider',async(req,res)=>{
    const rider= await Rider.find({_id:req.query.id})
    res.status(200).send(rider)
})


module.exports = router;