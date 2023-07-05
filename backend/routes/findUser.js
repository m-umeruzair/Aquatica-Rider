const express = require("express");
const router = express.Router();
const User= require('../models/user')

router.get('/findUser',async(req,res)=>{
    const user= await User.find({_id:req.query.id})
    res.status(200).send(user)
})




module.exports = router;