import "./App.css";
import ExposPage from "./pages/ExposPage.js";
import Shop from "./pages/Shop.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingCart from "./components/shop/Cart";
import ProductDetail from "./components/shop/productDetail.jsx";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import ForgotPassword from "./pages/ForgotPassword";
import ExpoStores from "./pages/ExpoStores";
import Form from "./pages/Form";
import Home from "./pages/Home";
import { LoginProvider } from "./LoginProvider";
import UpdateProduct from "./pages/updateProduct";
import AddProduct from "./pages/addProduct";
import Error from "./pages/Error";
import AddInvestor from "./pages/addInvestor";
import CreateInvestor from "./pages/createInvestor";
import AddExisting from "./pages/addExisting";
import AddOwner from "./pages/addOwner";

function App() {
  return (
    <>
      <LoginProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expos/:expoId/expo-stores/:expoStore/addProduct" element={<AddProduct />} />
            <Route path="/expos" element={<ExposPage />} />
            <Route path="/expos/add-expo" element={<Form />} />
            <Route path="/expos/:expoId/expo-stores" element={<ExpoStores />} />
            <Route path="/expos/:expoId/expo-stores/:expoStoreId/products" element={<Shop />} />
            <Route path="/expos/:expoId/expo-stores/:expoStoreId/products/cart" element={<ShoppingCart />} />
            <Route path="/expos/:expoId/expo-stores/:expoStoreId/products/:productId" element={<ProductDetail />} />
            <Route
              path="/:expoStoreId/products/:productId"
              element={<ProductDetail />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/expos/:expoId/expo-stores/:expoStoreId/products/edit-product/:productId"
              element={<UpdateProduct />}
            />
            <Route path="/add_owner" element={<AddOwner />} />
            <Route path="expos/:expoId/expo-stores/add" element={<AddInvestor />} />
            <Route path="/expos/:expoId/expo-stores/addExisting" element={<AddExisting/>} />
            <Route path="expos/:expoId/createInvestor" element={<CreateInvestor />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </LoginProvider>
    </>
  );
}

export default App;
