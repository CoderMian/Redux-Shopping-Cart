import { combineReducers } from "redux";
import {
  productReducer,
  selectedCartReducer,
  selectedProductReducer,
} from "./ProductReducer";
const rootReducer = combineReducers({
  productReducer,
  product: selectedProductReducer,
  cartItems: selectedCartReducer,
});
export default rootReducer;
