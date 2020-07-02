const express = require("express")
const orderRouter = express.Router()

Order = require("../models/orderModel")
Product = require("../models/productModel")
const orderValidation = require("../validations")
const { findById } = require("../models/orderModel")

orderRouter
  .route("/")
  .get((req, res) => {
    Order.find({}, (err, orders) => {
      res.status(200).json(orders)
    })
  })
  .post(orderValidation, async (req, res) => {
    let newOrder = new Order(req.body)
    const { flavour } = req.body
    const flavourName = await Product.findOne({ name: flavour});
    newOrder.pricePerScoop = flavourName.pricePerScoop
    newOrder.totalPrice = newOrder.pricePerScoop * newOrder.scoops
    const result = await newOrder.save()
    res.status(201).json(result)
  })

orderRouter
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params
    Order.findById(id, (error, order) => {
      error ? res.status(400).json(error) : res.status(200).json(order)
    })
  })
  .put(orderValidation, async (req, res) => {
    const { body, params } = req
    const id = params.id
    const options = { new: true}
    const { flavour } = body
    const flavourName = await Product.findOne({ name: flavour});
    body.pricePerScoop = flavourName.pricePerScoop
    body.totalPrice = body.pricePerScoop * body.scoops
    const result = await Order.findByIdAndUpdate(id, body, options)
    res.status(200).json(result)
  })
  .delete((req, res) => {
    const id = req.params.id
    Order.findById(id, (error, order) => {
      if (!!order) {
        order.remove((error) => {
          if (error) return res.status(400).json(error)
          res.status(200).json({ message: "Order successfully removed", id: id })
        })
      } else {
        res.status(404).json({ message: `Order with ID ${id} does not exist` })
      }
    })
  })

module.exports = orderRouter
