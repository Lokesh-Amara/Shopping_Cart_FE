import { ActionTypes } from "../constants/action-types";

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const loginUser = (
  state = { username: "default", address: {}, name: "", email: "" },
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.LOGIN_USER:
      return { ...state, ...payload };
    case ActionTypes.LOGOUT_USER:
      return {
        ...state,
        ...{ username: "default", address: {}, name: "", email: "" },
      };
    default:
      return state;
  }
};

const cartInitialState = {
  cartProducts: [],
};

export const addToCartReducer = (
  state = cartInitialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.ADD_TO_CART:
      return { ...state, cartProducts: [...state.cartProducts, payload] };
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartProducts: state.cartProducts.filter((x) => x !== payload),
      };
    case ActionTypes.EMPTY_CART:
      return { ...state, cartProducts: [] };
    default:
      return state;
  }
};
