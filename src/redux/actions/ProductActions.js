import { ActionTypes } from "../constants/Action-types";
export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};
export const setCartProducts = (data) => {
  return {
    type: ActionTypes.CART_PRODUCTS,
    payload: data,
  };
};
export const selectedProducts = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCTS,
    payload: product,
  };
};

export const removeSelectedProducts = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCTS,
  };
};
export const deleteItem = (id) => {
  return {
    type: ActionTypes.DELETE_PRODUCTS,
    payload: id,
  };
};
export const decreaseQuantity = (id) => {
  return {
    type: ActionTypes.DECREASE_QUANTITY,
    payload: id,
  };
};
