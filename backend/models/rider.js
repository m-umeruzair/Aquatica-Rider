const mongoose = require("mongoose");

const Rider = new mongoose.Schema({
 riderName:{
    required:true,
    type:String
 },
 riderEmail:{
    required:true,
    type:String
 },
 riderNumber:{
    required:true,
    type:String
 },
 riderVehicleNo:{
    required:true,
    type:String
 },
 riderVehicleName:{
    required:true,
    type:String
 },
 riderPassword:{
    required:true,
    type:String
 },
 riderNIC:{
    required:true,
    type:String
 },
 riderEarning:{
   type:Number
 },
 riderTotalOrders:{
   type:Number
 }

})

module.exports = mongoose.model("rider", Rider);