import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import ProductComponent from "./ProductComponent";
import { setProducts } from "../redux/actions/productActions";
import { removeSelectedProduct } from "../redux/actions/productActions";

const ProductListing = () => {
  const dispatch = useDispatch();

  //const url = "http://localhost:3001";
  const url = "https://shoppingcart-be.herokuapp.com";

  const fetchProducts = async () => {
    dispatch(removeSelectedProduct());
    const response = await axios.get(`${url}/products`).catch((err) => {
      console.log("ERR : ", err);
    });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="container-fluid mt-5">
        <ProductComponent />
      </div>
    </div>
  );
};

export default ProductListing;
