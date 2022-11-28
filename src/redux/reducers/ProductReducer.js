import { toast } from "react-toastify";
import { ActionTypes } from "../constants/Action-types";
import React from "react";
const initialState = {
  products: [],
};
const initialCart = {
  cartList: [],
};
export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    default:
      return state;
  }
};
export const selectedProductReducer = (state = {}, { type, payload }) => {
  const dismissAll = () => toast.dismiss();
  dismissAll();
  switch (type) {
    case ActionTypes.SELECTED_PRODUCTS:
      return {
        ...state,
        ...payload,
      };
    case ActionTypes.REMOVE_SELECTED_PRODUCTS:
      return {};
    default:
      return state;
  }
};
export const selectedCartReducer = (state = initialCart, { type, payload }) => {
  const dismissAll = () => toast.dismiss();
  switch (type) {
    case ActionTypes.CART_PRODUCTS:
      const ItemIndex = state.cartList.findIndex(
        (item) => item.id === payload.id
      );
      if (ItemIndex >= 0) {
        state.cartList[ItemIndex].quantity += 1;
        dismissAll();
        toast.info("Product Quantity Increased !!!", {
          position: "top-center",
          pauseOnFocusLoss: false,
          limit: 1,
        });
      } else {
        const myobj = {
          ...payload,
          quantity: 1,
        };
        dismissAll();
        toast.success("Product Added Successfully !!!", {
          position: "top-center",
          pauseOnFocusLoss: false,
          limit: 1,
        });
        return {
          ...state,
          cartList: [...state.cartList, myobj],
        };
      }

    case ActionTypes.DELETE_PRODUCTS:
      const updatedData = state.cartList.filter((elem) => {
        return elem.id !== payload;
      });

      return {
        ...state,
        cartList: updatedData,
      };
    case ActionTypes.DECREASE_QUANTITY:
      const DecreaseIndex = state.cartList.findIndex(
        (item) => item.id === payload.id
      );

      if (state.cartList.length > 0) {
        if (state.cartList[DecreaseIndex].quantity > 1) {
          state.cartList[DecreaseIndex].quantity -= 1;
          dismissAll();
          toast.warn("Product Quantity Decreased !!!", {
            position: "top-center",
            pauseOnFocusLoss: false,
            limit: 1,
          });
        } else {
          dismissAll();
          const updatedData = state.cartList.filter((elem) => {
            return elem.id !== payload.id;
          });
          return {
            ...state,
            cartList: updatedData,
          };
        }
      }
    default:
      return state;
  }
};
