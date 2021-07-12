import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const ProductComponent = () => {
  const history = useHistory();

  const loggedInUser = useSelector((state) => state.userLogin.username);

  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
    const { id, title, image } = product;
    return (
      <div
        onClick={() => {
          if (loggedInUser === "default") history.push("/");
          else history.push(`/product/${id}`);
        }}
        id="productComponentBox"
        className="pb-3"
        key={id}
      >
        <img
          src={image}
          alt={title}
          style={{ height: "200px" }}
          className="img-fluid p-3"
        ></img>
        <hr id="hrLine" />
        <span>
          <b id="productName">{title.substring(0, 20)}...</b>
        </span>
      </div>
    );
  });

  return <>{renderList}</>;
};

export default ProductComponent;
