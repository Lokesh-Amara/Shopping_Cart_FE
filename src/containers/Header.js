import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  emptyCart,
  logoutUser,
  removeSelectedProduct,
} from "../redux/actions/productActions";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.userLogin.username);
  const cartItems = useSelector((state) => state.cartProducts.cartProducts);

  return (
    <nav className="navbar " id="fixedNavBar">
      <div>
        <button
          className=" btn navbar-brand ms-5 navbarBrandButton"
          onClick={() => history.push("/home")}
        >
          <b>
            <i>ShopCart</i>
          </b>
        </button>
      </div>
      {loggedInUser !== "default" ? (
        <div className="me-5">
          <button className="btn userProfileBtn">
            <i className="fas fa-user"></i>&nbsp;
            {loggedInUser}
          </button>
          <button
            className="btn myCartBtn"
            onClick={() => {
              history.push("/mycart");
            }}
          >
            my cart({cartItems.length})
          </button>
          <button
            className="btn logoutBtn"
            onClick={() => {
              dispatch(logoutUser());
              dispatch(emptyCart());
              dispatch(removeSelectedProduct());
              history.push("/");
            }}
          >
            logout
          </button>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Header;
