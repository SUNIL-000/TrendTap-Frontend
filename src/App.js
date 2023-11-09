import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./components/auth/Signup";
import SignIn from "./components/auth/SignIn";
import PrivateRoute from "./components/routes/Private";
import ResetPassword from "./components/auth/ResetPassword";
import AdminPrivate from "./components/routes/adminPrivate";
// import ProductList from "./admin/ProductList";
import CatagoryList from "./admin/CatagoryList";
import UserList from "./admin/UserList";
import Dashboard from "./admin/Dashboard";
import UserProfile from "./user/UserProfile";
import UserDashboard from "./user/UserDashboard";
import UserOrder from "./user/UserOrder";
import SingleProduct from "./admin/SingleProduct";
import AllProducts from "./admin/AllProducts";
import Search from "./pages/Search";
// import Products from "./pages/Products";
import CatagoryPage from "./pages/CatagoryPage";
import SingleProducts from "./pages/SingleProducts";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Product from "./pages/Product";
import CreateProduct from "./admin/CreateProduct";
// import AdminDashboard from "./admin/AdminDashboard";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<Search />} />

          <Route path="/product" element={<Product />} />
          <Route path="/catagory/:id" element={<CatagoryPage />} />
          <Route path="/single-product/:slug" element={<SingleProducts />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset" element={<ResetPassword />} />

          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<UserDashboard />}>
              <Route path="profile" exact element={<UserProfile />} />
              <Route path="order" element={<UserOrder />} />
            </Route>
          </Route>

          <Route path="/dashboard" element={<AdminPrivate />}>
            <Route path="admin" element={<Dashboard />}>
              <Route path="catagory" exact element={<CatagoryList />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="user" element={<UserList />} />
              <Route path="products" element={<AllProducts />} />

              <Route path="product/:slug" element={<SingleProduct />} />

            </Route>
          </Route>

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
