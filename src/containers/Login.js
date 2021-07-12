import React, { useState } from "react";
import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { loginUser, addToCart } from "../redux/actions/productActions";

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("lamara");
  const [password, setPassword] = useState("Lokesh@02");
  const [userCheck, setUserCheck] = useState(true);
  const [passCheck, setPassCheck] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  //const url = "http://localhost:3001";
  const url = "https://shoppingcart-be.herokuapp.com";

  const handleClick = () => {
    setErrorMessage("");
    setUserCheck(true);
    setPassCheck(true);
    if (username.length === 0) setUserCheck(false);
    else if (password.length === 0) setPassCheck(false);
    else {
      setLoading(true);
      fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.status === "success") {
            for (const c of data.cartItems) {
              dispatch(addToCart(c));
            }
            dispatch(
              loginUser({
                username: username,
                address: data.address,
                name: data.name,
                email: data.email,
              })
            );
            history.push("/home");
          } else {
            setErrorMessage(data.status);
          }
        });
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <label className="form-label float-start" htmlFor="username">
              username :
            </label>
            <input
              className="form-control "
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            {userCheck ? (
              <p></p>
            ) : (
              <p style={{ color: "red" }}>Username is required!</p>
            )}
            <label className="form-label float-start mt-2" htmlFor="password">
              password :
            </label>
            <input
              className="form-control"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {passCheck ? (
              <p></p>
            ) : (
              <p style={{ color: "red" }}>Password is required!</p>
            )}
            <button
              className="btn mt-3"
              style={{ backgroundColor: "#52BF80" }}
              onClick={() => handleClick()}
            >
              Signin
            </button>
            {errorMessage.length > 0 ? (
              <p style={{ color: "red" }}>{errorMessage}</p>
            ) : (
              <p></p>
            )}
            <p className="mt-3">
              Don't have an account ?
              <span
                onClick={() => history.push("/register")}
                style={{ display: "inline", color: "blue" }}
              >
                <u> Register here..</u>
              </span>
            </p>
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
              <span></span>
            )}
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
