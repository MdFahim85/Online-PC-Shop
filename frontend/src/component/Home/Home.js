import React, { Fragment } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product.js";

const product = {
  name: "GPU",
  images: [
    {
      url: "https://www.bleepstatic.com/content/hl-images/2023/09/07/graphics-card.jpg",
    },
  ],
  price: "50,000tk",
  _id: "gpuId",
};

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to Online Pc Shop</p>
        <h1>Find Your Desired Products below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
