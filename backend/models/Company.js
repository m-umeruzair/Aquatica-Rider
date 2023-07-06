const mongoose = require("mongoose");

const Company = new mongoose.Schema({
 companyName:{
    required:true,
    type:String
 },
 companyEmail:{
    required:true,
    type:String
 },
 companyNumber:{
    required:true,
    type:Number
 },
 companyRegistration:{
    required:true,
    type:String
 },
 companyPassword:{
    required:true,
    type:String
 },
 companyAddress:{
    required:true,
    type:String
 },
 companyTotalSales:{
   required:true,
   type:Number
 }

})

module.exports = mongoose.model("Company", Company);