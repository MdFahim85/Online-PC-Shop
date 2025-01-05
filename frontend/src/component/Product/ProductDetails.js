import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors , getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component"; 
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const{product,loading, error} = useSelector(state => state.productDetails)
    useEffect(() => {
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(match.params.id));
    }, [dispatch, match.params.id,error,alert]);
    const options = {
        edit: false,
        activeColor: "tomato",
        color: "gray",
        isHalf: true,
        value: product.ratings,
    };
    return (
        <Fragment>
            {loading ?  <Loader/> : (        <Fragment>
            <div className="Productdetails">
                    <Carousel>
                        {product.images &&
                            product.images.map((item,i) => (
                                <img 
                                className="Carousel__image"
                                src={item.url} 
                                key={item.url} 
                                alt={`${i} Slide`}
                                />
                            ))}
                    </Carousel>
                </div>
            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product #{product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars {...options} />
                    <span>{product.numReviews} Reviews</span>
                </div>
                <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button>-</button>
                                <input type="number" value="1" />
                                <button>+</button>
                            </div>{""}
                            <button>Add to Cart</button>
                        </div>
                <p>
                    Status:{" "}
                    <b className={product.Stock <1 ? "red" : "green"}>  
                        {product.Stock < 1 ?  "Out of Stock": "In Stock"}
                    </b>
                </p>
                </div>
                <div className="detailsBlock-4">
                    Description: <p>{product.description}</p>
                </div>

                <button className="submitReview">Submit Review</button>
                <h3 className ="submitReview">Reviews</h3>
                {product.reviews && product.reviews[0]?(
                    <div className="reviewCard">
                        {product.reviews.map((review) => <ReviewCard review={review}/>)}
                    </div>
                ):(
                    <p className="noReview">No Reviews</p>
                )}
            </Fragment>)}

        </Fragment>

    );
};
export default ProductDetails;