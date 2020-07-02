const express = require("express")
const productRouter = express.Router()


Product = require("../models/productModel")
productRouter
  .route("/")
  .get((req, res) => {
    Product.find({}, (err, products) => {
      res.status(200).json(products)
    })
  })


module.exports = productRouter
