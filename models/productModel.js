const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    data: Buffer,
    contentType: String,
  },
  // productImage: {
  //   type:String,
  // },

  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  manufacturedDate: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  reOrderLevel: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Products", productSchema);
