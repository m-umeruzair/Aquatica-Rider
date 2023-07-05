const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderStatus:{
    type: String,
  },
  orderDeliveredBy:{
    type:String,
  },
  orderItems:{
    type:Array
  },
  orderPlacedby:{
    type:String
  },
  orderDate:{
    type:String
  },
  latitude:{
   type:String
  },
  longitude:{
    type:String
  },
  customerName:{
    type:String,
  },
  customerNumber:{
    type:String
  },
  orderAmount:{
    type:Number
  }
})

module.exports = mongoose.model("orders", orderSchema);