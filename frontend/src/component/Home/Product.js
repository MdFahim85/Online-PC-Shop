import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  size: window.innerWidth < 600 ? 20 : 25,
  activeColor: "tomato",
  value: "4.5",
};
const Product = ({ product }) => {
  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images[0].url} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} /> <span>(250 reviews)</span>
      </div>
      <span>{product.price}</span>
    </Link>
  );
};

export default Product;
