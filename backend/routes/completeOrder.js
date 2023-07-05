const express = require("express");
const Order = require("../models/order")
const router = express.Router();

router.post('/completeOrder', async(req,res)=>{

    if(req.body.x==1){
    await Order.findOneAndUpdate({_id:req.body.id},{$set:{orderStatus:"Delivered"}})
     console.log('aaaa')
    res.status(200).send()
    }

    if(req.body.x==2){
        await Order.findOneAndUpdate({_id:req.body.id},{$set:{orderStatus:"Accepted"}}) 
        res.status(200).send() 
    }
})

module.exports = router;