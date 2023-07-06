const express = require("express");
const product = require("../models/product");
const router = express.Router();


router.put("/updateProduct", async (req, res) => {
  
      const productId = req.body.id.split(', ');
      
      for (let i = 0; i < productId.length; i++) {
        const prodcuctid2 = productId[i];
        const c = await product.findOne({ _id:prodcuctid2 });
      
        if (c) {
          c.productQuantity -=1 ;
          await c.save();
        }
      
    }
   
      res.status(200).send("Update Completed")
    
  });



  module.exports = router;