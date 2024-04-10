import React from "react";
import {Link} from "react-router-dom";
import Rating from '@mui/material/Rating';
const ProductCard = ({product}) => {
  return (
    <div className="card">
      <div className="container">
        <div className="productImg">
          <img
            src={product.images[0].url}
            alt="Product Image"/>
        </div>
        <div className="productDetails">
        <Link to={`/product/${product._id}`}>
          <h1 className="title">{product.name.substring(0, 43)}</h1>
        </Link>
          <p className="desc">{`${product.description.substring(0,150)}..`}</p>
          <div>
            <h2 className="price">PKR {product.price}</h2>
            <p><Rating readOnly value={product.ratings} precision={0.5} size="large" style={{color:"#FF8C32"}} /></p>
          </div>
          <button className="cart">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
