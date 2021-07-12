import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { addToCart, selectedProduct } from "../redux/actions/productActions";
import Loader from "react-loader-spinner";

const ProductDetail = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const product = useSelector((state) => state.product);
  const { id, title, price, description, category, image } = product;

  const userName = useSelector((state) => state.userLogin.username);

  //const url = "http://localhost:3001";
  const url = "https://shoppingcart-be.herokuapp.com";
  var stars = Math.floor(Math.random() * 6);
  const [statusMssg, setStatusMssg] = useState("");

  const { productId } = useParams();
  const dispatch = useDispatch();

  const fetchProductDetail = async () => {
    const response = await axios
      .get(`${url}/getproductdetails/${productId}`)
      .catch((err) => {
        console.log("ERR : ", err);
      });

    dispatch(selectedProduct(response.data[0]));
  };

  const manageCart = async () => {
    setLoading(true);
    const cartItems = await axios
      .get(`${url}/getCartItems/${userName}`)
      // .then((res) => console.log(res.data[0].cartItems))
      .catch((err) => {
        console.log("ERR : ", err);
      });

    if (cartItems.data[0].cartItems.includes(id)) {
      setLoading(false);
      setStatusMssg("Item already present in the cart.");
    } else {
      axios
        .post(`${url}/addItemToCart`, {
          username: userName,
          id: id,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setLoading(false);
            dispatch(addToCart(id));
            setStatusMssg("Item added to cart.");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log("ERR : ", err);
        });
    }
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div className="container mt-5 ">
      <div className="row border">
        <div className="col-1 "></div>
        <div className="col-5 my-auto ">
          <img className="img-fluid " src={image} alt=""></img>
        </div>
        <div className="col-5 productDetailPage mt-3 ">
          <div>
            <h4>{title}</h4>
            <span>
              Brand : <i>Fashion Hub</i>
            </span>
          </div>
          <hr style={{ marginLeft: "5%", marginRight: "5%" }} />
          <div>
            <button className="btn tagButton px-0 pb-0">
              <i>#{category}</i>
            </button>
          </div>
          <div>
            <ReactStars size={40} value={stars < 1 ? 1 : stars} edit={false} />
          </div>
          <div>
            <span>
              <b>Price : ${price}</b>
            </span>
          </div>
          {price > 100 ? (
            <p style={{ color: "green" }}>
              <i>Free delivery available for this item...</i>
            </p>
          ) : (
            ""
          )}
          <div className="mt-2">
            <span>
              Country :
              <button className="btn border rounded p-0 ps-1  ms-1 inputCountryBox">
                United States &nbsp; &nbsp; &nbsp;
              </button>
            </span>
          </div>
          <hr style={{ marginLeft: "5%", marginRight: "5%" }} />
          <div className="mt-2">
            <span className="productDescription">{description}</span>
          </div>
          <div className="mt-5 ms-4 ">
            <button
              className="btn addToCartBtn rounded-pill"
              onClick={() => manageCart()}
            >
              <b>Add to cart</b>
            </button>
            <span className="ms-2" style={{ color: "green" }}>
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={80}
                  width={50}
                  timeout={5000}
                  className="ms-4"
                />
              ) : (
                statusMssg
              )}
            </span>
          </div>
          <div className="mt-3 ms-4 mb-5">
            <button
              className="btn rounded-pill buyBtn"
              onClick={() => history.push("/userdetails")}
            >
              <b>Buy now</b>
            </button>
          </div>
        </div>
        <div className="col-1 "></div>
      </div>
    </div>
  );
};

export default ProductDetail;
