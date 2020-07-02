const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
  customerName: { 
    type: String,
    unique: true,
    required: true
  },
  flavour: { 
    type: String,
    ref: 'products',
  },
  scoops: { 
    type: Number,
    required: true
  },
  pricePerScoop: { 
    type: Number,
    ref: 'products',
  },
  totalPrice: { 
    type: Number,
  }
}, { timestamps: true })

const Order = module.exports = mongoose.model('orders', orderSchema)

