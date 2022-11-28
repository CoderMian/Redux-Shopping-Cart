import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { deleteItem } from "../redux/actions/ProductActions";
import "./detail.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProducts,
  removeSelectedProducts,
  setCartProducts,
  decreaseQuantity,
} from "../redux/actions/ProductActions";
import { History, Translate } from "@mui/icons-material";
const ProductDetails = () => {
  const [disQuantity, setDisQuantity] = useState(0);
  const { productId } = useParams();
  const history = useNavigate();
  const product = useSelector((state) => state.product);
  const cartProduct = useSelector((state) => state.cartItems);
  const { image, title, price, category, id } = product;

  const setInitialQuantity = () => {
    cartProduct.cartList.map((elem) => {
      if (elem.id.toString() === productId) {
        setDisQuantity(elem.quantity);
      }
    });
  };
  const dispatch = useDispatch();
  const fetchProductDetail = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((error) => {
        console.log("error", error);
      });
    dispatch(selectedProducts(response.data));
  };
  useEffect(() => {
    if (productId && productId !== "") {
      setInitialQuantity();
      fetchProductDetail();
      return () => {
        dispatch(removeSelectedProducts());
      };
    }
  }, [productId]);
  return (
    <>
      <div className="container my-2">
        <h2 className="text-center">Items Details Page</h2>
        {Object.keys(product).length === 0 ? (
          <div>Loading...</div>
        ) : (
          <section
            className="container mt-3 card"
            style={{ width: "max-content", height: "max-content" }}
          >
            <div className="itemsdetails d-flex justify-content-center align-items-center">
              <div
                className="items_img "
                style={{
                  width: "400px",
                  heigth: "400px",
                }}
              >
                <img
                  src={image}
                  alt="splash"
                  style={{ width: "100%", heigth: "100%" }}
                />
              </div>

              <div className="details ">
                <Table>
                  <tr>
                    <td>
                      <p>
                        <strong>Product Name</strong>:{" "}
                        {title.length > 10
                          ? `${title.substring(0, 20)}...`
                          : title}
                      </p>
                      <p>
                        <strong>Price</strong>: ₹ {price}
                      </p>
                      <p>
                        <strong>Category</strong>: {category}
                      </p>
                      <p>
                        <strong>Total</strong>: ₹{" "}
                        {(price * disQuantity).toFixed(2)}
                      </p>
                      <div
                        className="mt-5 d-flex justify-content-between align-items-center"
                        style={{
                          width: 100,
                          cursor: "pointer",
                          background: "#ddd",
                          color: "#111",
                        }}
                      >
                        <span
                          style={{ fontSize: 24, fontWeight: "bolder" }}
                          onClick={() => {
                            dispatch(
                              decreaseQuantity(product),
                              setDisQuantity(
                                disQuantity > 0 ? disQuantity - 1 : disQuantity
                              )
                            );
                            if (disQuantity === 1) {
                              history("/");
                            }
                          }}
                        >
                          -
                        </span>
                        <span style={{ fontSize: 18 }}>{disQuantity}</span>
                        <span
                          style={{ fontSize: 24, fontWeight: "bolder" }}
                          onClick={() => {
                            dispatch(
                              setCartProducts(product),
                              setDisQuantity(disQuantity + 1)
                            );
                          }}
                        >
                          +
                        </span>
                      </div>
                    </td>
                    <td>
                      <p>
                        <strong>Rating:</strong>
                        <span
                          style={{
                            background: "green",
                            color: "#fff",
                            padding: "2px 5px",
                            borderRadius: "5px",
                          }}
                        >
                          {product.rating.rate} ★
                        </span>
                      </p>
                      <p>
                        <strong>Order Review:</strong>{" "}
                        <span>
                          {product.rating.count} + <br />
                          order placed from here recently
                        </span>
                      </p>
                      <p>
                        <strong>Remove : </strong>
                        <span>
                          <i
                            className="fas fa-trash"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              dispatch(deleteItem(product.id));
                              history("/");
                            }}
                          ></i>
                        </span>
                      </p>
                    </td>
                  </tr>
                </Table>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
