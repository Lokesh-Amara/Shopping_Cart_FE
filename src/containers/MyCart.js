import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  removeFromCart,
  selectedProduct,
} from "../redux/actions/productActions";
import Loader from "react-loader-spinner";

export default function MyCart() {
  const [loading, setLoading] = useState(false);

  var cartItems = useSelector((state) => state.cartProducts.cartProducts);
  const userName = useSelector((state) => state.userLogin.username);

  //const url = "http://localhost:3001";
  const url = "https://shoppingcart-be.herokuapp.com";
  const dispatch = useDispatch();
  const history = useHistory();

  var itemList = [];
  const [itList, setItList] = useState([]);

  function updateCart(ID) {
    dispatch(removeFromCart(ID));
    setLoading(true);
    fetch(`${url}/removeItemFromCart`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        id: ID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status === "success") {
          cartItems.splice(cartItems.indexOf(ID), 1);
          getProductDetails(cartItems);
        }
      });
  }

  const CartComp = (props) => {
    return (
      <div className="container border rounded mb-3">
        <div className="row">
          <div className="col-4 py-3">
            <img
              src={props.data.image}
              className="img-fluid"
              style={{ maxHeight: "20vh" }}
              alt=""
            ></img>
          </div>
          <div className="col-8 pt-3" style={{ textAlign: "left" }}>
            <div>
              <h4>{props.data.title}</h4>
              <span>
                Price : <b>{props.data.price}$</b>
              </span>

              <div className="mt-3">
                <button
                  className="btn rounded-pill viewBtn"
                  onClick={() => {
                    history.push(`/product/${props.data.id}`);
                  }}
                >
                  <b>Open</b>
                </button>
                <button
                  className="btn ms-3 rounded-pill removeBtn"
                  onClick={() => {
                    updateCart(props.data.id);
                  }}
                >
                  <b>Remove from cart</b>
                </button>
                <button
                  className="ms-3 btn rounded-pill buyBtn"
                  onClick={() => {
                    dispatch(selectedProduct(props.data));
                    history.push("/userdetails");
                  }}
                >
                  <b>Buy now</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getProductDetails = async (x) => {
    itemList = [];
    setLoading(true);
    await fetch(`${url}/getproducts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: x,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setLoading(false);
          for (const v of data.data) {
            itemList.push(<CartComp data={v} key={v.id} />);
          }
          setItList(itemList);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getProductDetails(cartItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container ">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10  my-3">
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
            itList
          )}
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}
