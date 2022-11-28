import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route
            exact
            path="/product/:productId"
            // path="/"
            element={<ProductDetails />}
          />
          <Route>404 NOT FOUND</Route>
        </Routes>
      </Router>
    </div>
    // <Popups />
  );
}

export default App;
