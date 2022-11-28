import { useDispatch, useSelector } from "react-redux";
import { setCartProducts } from "../redux/actions/ProductActions";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const ProductComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  return (
    <>
      <div className="row d-flex justify-content-center align-items-center ">
        {products.map((product) => {
          const { id, title, image, price, category } = product;
          return (
            <>
              <Card
                style={{ width: "20rem" }}
                className="mx-0  mx-md-4   my-3 p-1 col-3 col-md-4"
                key={id}
              >
                <Card.Img
                  variant="top"
                  src={image}
                  style={{ height: "16rem" }}
                />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text
                    className="text-danger"
                    style={{ padding: "0px", margin: "2px" }}
                  >
                    Price : ₹ {price}
                  </Card.Text>
                  <Card.Text className="text-success">
                    Category : {category}
                  </Card.Text>
                  <div className="button_di d-flex justify-content-center">
                    <Button
                      variant="primary"
                      className="col-lg-12"
                      onClick={() => {
                        dispatch(setCartProducts(product));
                      }}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ProductComponent;
