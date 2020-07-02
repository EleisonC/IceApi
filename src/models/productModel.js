const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema ({
  name: { 
    type: String,
  },
  pricePerScoop:{
    type: Number,
  }
},)

const Products = module.exports = mongoose.model('products', productsSchema)

