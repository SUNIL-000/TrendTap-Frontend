import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // Add item to wishlist
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const pasreCart =JSON.parse(savedCart);
    console.log(pasreCart)
    if (pasreCart) {
      setCart(pasreCart);
    }
  }, []);
  

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
