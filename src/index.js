import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StyleProvider } from "@ant-design/cssinjs";
import { AuthProvider } from "./context/authContext";
// import { DataFilter } from "./context/filterContext";
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/wishlistContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyleProvider hashPriority="high">
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StyleProvider>
);
