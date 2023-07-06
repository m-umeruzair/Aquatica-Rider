const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
      type: String,
      required: true,
    },
    productId: {
        type: Number,
        require: true,
      },

    productType: {
      type: String,
      require: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
  
    productPrice: {
      type: Number,
      required: true,
    },
    productCompany: {
      type: String,
      required: true,
    },
   
    
  });
  
  module.exports = mongoose.model("product", productSchema);