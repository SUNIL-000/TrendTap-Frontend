import { useState, createContext, useContext, useEffect } from "react";
import { json } from "react-router-dom";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  // Add item to wishlist
  useEffect(() => {
    const savedwishlist = localStorage.getItem('wishlist');
    const parseWishlist =JSON.parse(savedwishlist);
    console.log("wishlist")
    console.log(parseWishlist);
    if (parseWishlist) {
      setWishlist(parseWishlist);
    }
  }, []);

  return (
    <WishlistContext.Provider value={[wishlist, setWishlist]}>
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);
export { useWishlist, WishlistProvider };
