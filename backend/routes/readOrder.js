const express = require("express");
const Order = require("../models/order")
const router = express.Router();


router.get('/readOrder',async(req,res)=>{
    const order=await Order.find({orderStatus:'Order Placed'})
    if(Object.keys(order).length!=0){
        res.status(200).send(order)
    }else{
        res.status(404).send()
    }
})




module.exports = router;