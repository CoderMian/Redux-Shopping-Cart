import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../redux/actions/ProductActions";
import { productReducer } from "../redux/reducers/ProductReducer";
import ProductComponent from "./ProductComponent";
const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((error) => {
        console.log("error", error);
      });

    if (response.data != []) {
      dispatch(setProducts(response.data));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <ProductComponent />
    </div>
  );
};

export default ProductList;
