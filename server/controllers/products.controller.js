import { tryCatch } from "../middlewares/tryCatch.js";
import { Product } from "../models/product.models.js";
import ErrorHandler from "../utils/errorHandler.js";
import Features from "../utils/features.js";
// Create New Product
export const createProduct = tryCatch(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
export const getAllProducts = tryCatch(async (req, res) => {
  const resultPerPage = 8;
  const features = new Features(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await features.query;
  const totalProducts = await Product.countDocuments();
  res.status(200).json({
    success: true,
    totalProducts,
    productsThisPage: products.length,
    products,
  });
});
export const getLatestProducts = tryCatch(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(8);
  res.status(200).json({
    success: true,
    productsThisPage: products.length,

    products,
  });
});

export const updateProduct = tryCatch(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});
export const getProductDetails = tryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

export const deleteProduct = tryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// add or update product review
export const createProductReview = tryCatch(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Prouduct not found", 404));
  }
  const isReviewd = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );
  if (isReviewd) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg/product.reviews.length;
  await product.save();
  res.status(201).json({
    success:true,
    message:"Product Reviewed Successfully"
  })
});

// Get All Reviews of a Product 
export const getAllProductReviews = tryCatch(async (req,res,next)=>{
  const product = await Product.findById(req.query.productId);
  if(!product){
    return next(new ErrorHandler("Product Not Found",404))
  }
  const reviews = product.reviews;
  if(product.reviews.length<1){
    res.status(200).json({
      success:true,
      message:"Product has not been reviewed yet",
      reviews
    })
  }
    res.status(200).json({
      success:true,
      reviews
    })
})

// Delete Review -- (Admin)
export const deleteReview = tryCatch(async (req,res,next)=>{
  const product = await Product.findById(req.query.productId);
  if(!product){
    return next(new ErrorHandler("Product Not Found",404))
  }
    product.reviews = product.reviews.filter((rev)=>{
    return rev._id.toString() !== req.query.id.toString();
  })
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  if(product.reviews.length!==0){
    product.ratings = Number(avg/product.reviews.length);
  } else{product.ratings = 0}
  product.numOfReviews = product.reviews.length;
  await product.save()
  res.status(200).json({
    success:true,
    message:"Review Deleted Successfully"
  })
})