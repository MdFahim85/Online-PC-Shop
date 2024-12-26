const Order = require("../models/ordermodel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
    const {orderItems,shippingInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paymentInfo} = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user._id,
    });
    res.status(201).json({
        success:true,
        order,
    });
});


exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");
    if (!order){
        return next(new ErrorHander("Order not found with this ID",404));
    }
    res.status(200).json({
        success:true,
        order,
    });
});


exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});
    res.status(200).json({
        success:true,
        orders,
    });
});

exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{  
    const orders = await Order.find();
    res.status(200).json({
        success:true,
        orders,
    });
});


exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if (!order){
        return next(new ErrorHander("Order not found with this ID",404));
    }
    
    if (order.orderStatus === "Delivered"){
        return next(new ErrorHander("You have already delivered this order",400));
    }
    order.orderItems.forEach(async (o)=>{
        await updateStock(o.product,o.quantity);
    });

    order.orderStatus = req.body.status;
    
    if (req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    });
});

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.Stock = product.Stock - quantity;
    await product.save({validateBeforeSave:false}); 
}


exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if (!order){
        return next(new ErrorHander("Order not found with this ID",404));
    }
    await order.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success:true,
    });
});


