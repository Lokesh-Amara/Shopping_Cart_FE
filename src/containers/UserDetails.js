import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { loginUser } from "../redux/actions/productActions";
import Loader from "react-loader-spinner";

export default function UserDetails() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const loggedInUser = useSelector((state) => state.userLogin.username);
  const fullName = useSelector((state) => state.userLogin.name);
  const email = useSelector((state) => state.userLogin.email);
  const dno = useSelector((state) => state.userLogin.address.drno);
  const strt = useSelector((state) => state.userLogin.address.street);
  const cty = useSelector((state) => state.userLogin.address.city);
  const pcode = useSelector((state) => state.userLogin.address.pincode);
  const stts = useSelector((state) => state.userLogin.address.states);

  const [doorNo, setDoorNo] = useState(dno === undefined ? "" : dno);
  const [street, setStreet] = useState(strt === undefined ? "" : strt);
  const [city, setCity] = useState(cty === undefined ? "" : cty);
  const [pincode, setPincode] = useState(pcode === undefined ? "" : pcode);
  const [states, setStates] = useState(stts === undefined ? "" : stts);

  const [btn1Status, setBtn1Status] = useState(true);
  const [mssg, setMssg] = useState("");

  //const url = "http://localhost:3001";
  const url = "https://shoppingcart-be.herokuapp.com";
  useEffect(() => {
    setBtn1Status(false);
  }, [doorNo, street, city, pincode, states]);

  const handleContinue = () => {
    setMssg("");
    if (
      doorNo !== "" &&
      street !== "" &&
      city !== "" &&
      pincode !== "" &&
      states !== ""
    ) {
      history.push("/buy");
    } else {
      setMssg("Please fill all the fields!");
    }
  };

  const handleUpdateAndContinue = () => {
    setMssg("");
    if (
      doorNo !== "" &&
      street !== "" &&
      city !== "" &&
      pincode !== "" &&
      states !== ""
    ) {
      setLoading(true);
      fetch(`${url}/adduseraddress`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: loggedInUser,
          drno: doorNo,
          street: street,
          city: city,
          pincode: pincode,
          states: states,
        }),
      }).then(() => {
        setLoading(false);
        dispatch(
          loginUser({
            address: {
              drno: doorNo,
              street: street,
              city: city,
              pincode: pincode,
              states: states,
            },
          })
        );
        history.push("/buy");
      });
    } else {
      setMssg("Please fill all the fields!");
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 border">
          <h4>Delivery address</h4>
          <div className="input-group my-3">
            <label htmlFor="userFullName" className="input-group-text">
              <b>Name</b>
            </label>
            <input
              type="text"
              value={fullName}
              readOnly
              className="form-control"
              id="userFullName"
            ></input>
          </div>
          <div className="input-group my-3">
            <label htmlFor="usermail" className="input-group-text">
              <b>Email</b>
            </label>
            <input
              type="text"
              value={email}
              readOnly
              className="form-control"
              id="usermail"
            ></input>
          </div>
          <div className="input-group my-3">
            <label htmlFor="doorno" className="input-group-text">
              <b>Door no :</b>
            </label>
            <input
              type="text"
              value={doorNo}
              className="form-control"
              id="doorno"
              onChange={(e) => setDoorNo(e.target.value)}
            ></input>
          </div>
          <div className="input-group my-3">
            <label htmlFor="street" className="input-group-text">
              <b>Street :</b>
            </label>
            <input
              type="text"
              value={street}
              className="form-control"
              id="street"
              onChange={(e) => setStreet(e.target.value)}
            ></input>
          </div>
          <div className="input-group my-3">
            <label htmlFor="city" className="input-group-text">
              <b>City :</b>
            </label>
            <input
              type="text"
              value={city}
              className="form-control"
              id="city"
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
          <div className="input-group my-3">
            <label htmlFor="pincode" className="input-group-text">
              <b>Pincode :</b>
            </label>
            <input
              type="text"
              value={pincode}
              className="form-control"
              id="pincode"
              onChange={(e) => setPincode(e.target.value)}
            ></input>
          </div>
          <div className="input-group my-3">
            <label htmlFor="userstate" className="input-group-text">
              <b>State :</b>
            </label>
            <input
              type="text"
              value={states}
              className="form-control"
              id="userstate"
              onChange={(e) => setStates(e.target.value)}
            ></input>
          </div>
          <button
            className="btn  rounded my-3"
            style={{ backgroundColor: "#E8E462" }}
            disabled={btn1Status}
            onClick={() => handleUpdateAndContinue()}
          >
            <b>Update & Continue</b>
          </button>
          <button
            className="btn  ms-3 my-3"
            style={{ color: "white", backgroundColor: "#7EDD7E" }}
            onClick={() => handleContinue()}
          >
            <b>Continue</b>
          </button>
          <div>
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
              ""
            )}
          </div>
          <div>
            <span className="mb-3" style={{ color: "red" }}>
              {mssg}
            </span>
          </div>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}
