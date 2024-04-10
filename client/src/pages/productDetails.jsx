import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../redux/actions/products";
import toast from "react-hot-toast";
import Carousel from "react-material-ui-carousel";
import Loader from "../components/Loader";
import Rating from "@mui/material/Rating";
import ReviewCard from "../components/ReviewCard";

const productDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const increaseQty = () => {
    if (quantity >= product.stock) {
      return toast.error("Max Quantity Reached");
    }
    setQuantity(quantity + 1);
  };
  const deccreaseQty = () => {
    if (quantity <= 1) {
      return toast.error("Minimum Quantity Reached");
    }
    setQuantity(quantity - 1);
  };
  const { product, error, loading } = useSelector(
    (state) => state.productSlice
  );
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getProductDetails(params.id));
    if (error) {
      toast.error(error.message);
    }
  }, [dispatch]);
  const carouselOptions = {
    indicators: false,
    autoPlay: false,
    animation: "slide",
    height: 500,
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="productDetailsPage">
          <div className="mainContainer">
            <div className="carouselContainer">
              <Carousel {...carouselOptions}>
                {product.images.map((image, index) => {
                  return (
                    <img
                      className="carouselImg"
                      key={index}
                      src={image.url}
                      alt={image.url}
                    />
                  );
                })}
              </Carousel>
            </div>
            <div className="detailsContainer">
              <h2 className="productName">{product.name}</h2>
              <p className="id">Product ID: {product._id}</p>
              <div className="ratings">
                <Rating
                  readOnly
                  value={product.ratings}
                  precision={0.5}
                  size="large"
                  style={{ color: "#FF8C32" }}
                />
                <p>({`${product.numOfReviews} Reviews`})</p>
              </div>
              <h2 className="price">PKR {product.price * quantity}</h2>
              <div className="quantity">
                <button onClick={deccreaseQty}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={increaseQty}>+</button>
              </div>
              <button className="cartBtn">Add to Cart</button>
              <p>
                Status:{" "}
                <span
                  className={`status ${product.stock >= 1 ? "green" : "red"}`}
                >{`${product.stock >= 1 ? "In Stock" : "Out Of Stock"}`}</span>
              </p>
              <h2>Description:</h2>
              <p className="desc">{product.description}</p>
              <button className="reviewBtn">Submit Review</button>
            </div>
          </div>
          <div className="reviewsContainer">
            <h1>Reviews</h1>
            <hr />
            { product.reviews.length>0?<div className="reviews">

              {product.reviews.map((review,index)=>{
                return <ReviewCard review={review} key={index}/>
              })}
            </div>
              :
              <p>This Product has not been reviewed yet</p>
            }
          </div>
        </section>
      )}
    </>
  );
};

export default productDetails;
