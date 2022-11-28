import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import Table from "react-bootstrap/Table";
import { deleteItem } from "../redux/actions/ProductActions";
import MenuItem from "@mui/material/MenuItem";
import { productReducer } from "../redux/reducers/ProductReducer";
import { useEffect } from "react";
const Header = () => {
  const [price, setPrice] = useState(0);
  const history = useNavigate();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartItems);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setTotal = () => {
    let total = 0;
    cartProducts.cartList.map((elem, k) => {
      total = (elem.price + total) * elem.quantity;
    });
    setPrice(total);
  };
  useEffect(() => {
    setTotal();
  }, [setTotal]);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <Link to="/" className="mx-sm-2 mx-1 text-decoration-none text-info">
            Developed By Mian Noman
          </Link>
          <Nav className="me-auto">
            <Link
              to="/"
              className="text-decoration-none text-light mx-2 mx-sm-5"
            >
              Home
            </Link>
          </Nav>
          <Badge
            badgeContent={cartProducts.cartList.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i className="fa-solid fa-2x fa-cart-shopping text-light"></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {cartProducts.cartList.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photos</th>
                    <th>Brand Name</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.cartList.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <Link to={`/product/${e.id}`}>
                              <img
                                src={e.image}
                                alt="cartimage"
                                style={{ width: "5rem", height: "5rem" }}
                                onClick={handleClose}
                              />
                            </Link>
                          </td>
                          <td>
                            <p>{e.title}</p>
                            <p>Price : ₹{e.price}</p>
                            <p>QUANTITY : {e.quantity}</p>
                            <p
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                            >
                              <i
                                className="fas fa-trash"
                                onClick={() => {
                                  dispatch(deleteItem(e.id), history("/"));
                                }}
                              ></i>
                            </p>
                          </td>
                          {/* <td
                            className="mt-5"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </td> */}
                        </tr>
                      </>
                    );
                  })}

                  <p className="text-center" style={{ width: "max-content" }}>
                    Total : ₹{price.toFixed(2)}
                  </p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "24rem", padding: 10, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  cursor: "pointer",
                  fontSize: 23,
                }}
                onClick={handleClose}
              ></i>
              <p style={{ fontSize: 23 }}>Your cart is empty</p>
              <img
                className="emptycart_img"
                style={{ width: "10rem", padding: 10 }}
                src="./cart.gif"
                alt=""
              />
            </div>
          )}
        </Menu>
      </Navbar>
      <br />
    </>
  );
};

export default Header;
