import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import Loader from "react-loader-spinner";

export default function Register() {
  //const url = "http://localhost:3001";
  const url = "https://shoppingcart-be.herokuapp.com";
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passValidation, setpassValidation] = useState(false);

  const [inputCheck, setInputCheck] = useState(true);
  const [registerMssg, setRegisterMssg] = useState("");
  //   const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (
      name.length === 0 ||
      userName.length === 0 ||
      email.length === 0 ||
      password.length === 0
    )
      setInputCheck(false);
    else {
      setInputCheck(true);
      fetch(`${url}/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: userName,
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setRegisterMssg("success");
          } else {
            setRegisterMssg("failed");
          }
        });
    }
  };

  useEffect(() => {
    if (password.length === 0) {
      setpassValidation(false);
    } else if (password.length > 7) {
      let r1 = /[A-Z]/g;
      let r2 = /[a-z]/g;
      let r3 = /[0-9]/g;
      let r4 = /[!@#$%&*]/g;
      if (
        password.search(r1) === -1 ||
        password.search(r2) === -1 ||
        password.search(r3) === -1 ||
        password.search(r4) === -1
      )
        setpassValidation(true);
      else setpassValidation(false);
    } else setpassValidation(true);
  }, [password]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <label className="form-label float-start" htmlFor="name">
            name :
          </label>
          <input
            className="form-control "
            id="name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label className="form-label float-start" htmlFor="username">
            username :
          </label>
          <input
            className="form-control "
            id="username"
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          <label className="form-label float-start " htmlFor="email">
            Email :
          </label>
          <input
            className="form-control"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label className="form-label float-start " htmlFor="password">
            password :
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {passValidation ? (
            <span
              style={{ color: "#F46A10", display: "block", fontSize: "12px" }}
            >
              Password should contain a minimum of 8 characters and include one
              capital letter, one small letter, one number and any of these
              special characters(!@#$%&*).
            </span>
          ) : (
            ""
          )}
          <button
            className="btn btn-primary mt-2"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
          {inputCheck ? (
            <p></p>
          ) : (
            <p style={{ color: "red" }}>Please fill all the fields!</p>
          )}
          {registerMssg === "" ? (
            ""
          ) : registerMssg === "success" ? (
            <span>
              Registration completed. Please <Link to="/">login.</Link>{" "}
            </span>
          ) : (
            <span>
              Registration failed. Please refresh the page and try again.
            </span>
          )}
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}
