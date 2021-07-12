import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function BuyPage() {
  const history = useHistory();

  const selectedProduct = useSelector((state) => state.product);
  const deliveryAddress = useSelector((state) => state.userLogin.address);
  const fullname = useSelector((state) => state.userLogin.name);
  const email = useSelector((state) => state.userLogin.email);

  function closePromptBox() {
    const promptBox = document.getElementById("promptBox");
    const promptClose = document.getElementById("promptClose");

    promptBox.parentNode.removeChild(promptBox);
    promptClose.parentNode.removeChild(promptClose);

    history.push("/home");
  }

  function customPrompt() {
    var id = "promptBox",
      promptBox,
      closeId = "promptClose",
      promptClose;
    promptBox = document.createElement("div");

    promptBox.id = id;
    var para = document.createElement("p");
    para.id = "promptPara";
    para.classList.add("mt-3");
    para.innerHTML = "<b>Your order is placed.</b>";
    promptBox.appendChild(para);
    var bttn = document.createElement("button");
    bttn.id = "bttn";
    bttn.classList.add("btn", "ms-3", "rounded");
    bttn.innerHTML = "<b>Ok</b>";
    bttn.onclick = closePromptBox;
    promptBox.appendChild(bttn);
    document.body.appendChild(promptBox);
    promptClose = document.createElement("div");
    promptClose.id = closeId;
    document.body.appendChild(promptClose);
  }

  return (
    <div>
      <div
        className="container border rounded mb-3"
        style={{ marginTop: "20vh" }}
      >
        <div className="row">
          <div className="col-4 py-3">
            <img
              src={selectedProduct.image}
              className="img-fluid"
              style={{ maxHeight: "20vh" }}
              alt=""
            ></img>
          </div>
          <div className="col-8 pt-3" style={{ textAlign: "left" }}>
            <div>
              <h3 className="mb-3">{selectedProduct.title}</h3>
              <div className="mb-3">
                <b>Brand</b> : <i>Fashion Hub</i>
              </div>
              <span>
                <b>Price</b> : {selectedProduct.price}$
              </span>
              <div className="mt-3">
                <h5>Delivery address : </h5>
                <span>
                  {fullname}, {deliveryAddress.drno}, {deliveryAddress.street},{" "}
                  {deliveryAddress.city}, {deliveryAddress.pincode},{" "}
                  {deliveryAddress.states}.
                </span>
              </div>
              <div className="mt-3">
                <b>Email : </b>
                {email}
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  className="btn rounded-pill my-5 finalBuyBtn"
                  onClick={() => customPrompt()}
                >
                  <b>Buy Now</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
