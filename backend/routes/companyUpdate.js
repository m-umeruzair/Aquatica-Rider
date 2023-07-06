const express = require("express");
const company = require("../models/Company");
const router = express.Router();


router.put("/updateCompany", async (req, res) => {
    
    var companyTotalSales=req.body.companyTotalSales
    
    if ( req.body.companyName==null)
     {
      res.status(400).send("Nothing to update")
    } else {
      
      if (  companyTotalSales != undefined) {
        const companyNames = req.body.companyName.split(', ');
        const salesValues = req.body.companyTotalSales.split(', ');
        
        for (let i = 0; i < companyNames.length; i++) {
          const companyName = companyNames[i];
          const salesValue = parseInt(salesValues[i]);
        
          const c = await company.findOne({ companyName:companyName });
        
          if (c) {
            c.companyTotalSales += salesValue;
            await c.save();
          }
        }


      //   const name= req.body.companyName
      //   const c= await company.find({companyName:name})
      //   c[0].companyTotalSales= c[0].companyTotalSales+companyTotalSales
      //   await company.updateOne(
      //     {   companyName: name },
      //     { $set: {  companyTotalSales:  c[0].companyTotalSales } }
      //   );
      // }
      // if ( companyPassword != undefined) {
      //   await company.updateOne(
      //     {   _id: x },
      //     { $set: {  companyPassword: companyPassword} }
      //   );
      }
      res.status(200).send("Update Completed")
    }
  });



  module.exports = router;