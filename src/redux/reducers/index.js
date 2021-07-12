import { combineReducers } from "redux";
import {
  productReducer,
  selectedProductReducer,
  loginUser,
  addToCartReducer,
} from "./productReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductReducer,
  userLogin: loginUser,
  cartProducts: addToCartReducer,
});

export default reducers;
