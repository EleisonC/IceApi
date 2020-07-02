Order = require('./models/orderModel');

const orderValidation = async (req, res, next) => {
  const body = req.body

  if(!body.hasOwnProperty('customerName') || body.customerName === "") {
    return res.status(400).json({message: "Order customer name is required please"})
  }
  if(!body.hasOwnProperty('flavour') || body.flavour === "") {
    return res.status(400).json({message: "Flavour is required please"})
  }
  if(!body.hasOwnProperty('scoops') || body.scoops === "") {
    return res.status(400).json({message: "Number Of scoops is required please"})
  }

  if (req.method !== "PUT") {
    const existingOrder = await Order.findOne({customerName: req.body.customerName}).exec()
    if(!!existingOrder) {
    return res.status(400).json({message: `Order ${req.body.customerName} Already Exists`});
    }
  }
  next()
}

module.exports = orderValidation