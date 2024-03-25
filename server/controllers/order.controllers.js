import { tryCatch } from "../middlewares/tryCatch.js";
import { Order } from "../models/order.models.js";
import { Product } from "../models/product.models.js";
import ErrorHandler from "../utils/errorHandler.js";
export const newOrder = tryCatch(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});
// Get LoggedIn User Orders
export const myOrders = tryCatch(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});
// Get Order Details
export const orderDetails = tryCatch(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order Not Found", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// Get All Orders
export const getAllOrders = tryCatch(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order Status
export const updateOrderStatus = tryCatch(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order Not Found", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("This order has already been delivered", 400));
  }
  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  order.orderStatus = req.body.status;
  await order.save();
  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save();
}

// Get Order Details
export const deleteOrder = tryCatch(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return next(new ErrorHandler("Order Not Found", 404));
    }
    await order.deleteOne();
    res.status(200).json({
      success: true,
      message:"Order has been deleted Successfully",
    });
  });