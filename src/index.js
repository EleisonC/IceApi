const express = require('express');
const axios = require('axios');
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRouter = require('./routers/orderRouter');
const productRouter = require('./routers/productRouter');

const app = express();
const db = mongoose.connect("mongodb+srv://B50CQeKW5ENCYNdS:1Qk9e7XE1MSIO90R@cluster0.ewiq8.mongodb.net/icecream?retryWrites=true&w=majority", 
                    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(cors());                    
app.use(bodyParser.json())
app.use('/api/orders', orderRouter)
app.use('/api/products', productRouter)

app.set('axios', axios);

app.listen(4000, () => {
  console.log('Application running on port 4000...')
})

module.exports = app