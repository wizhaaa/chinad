import {WatchRounded} from "@material-ui/icons";
import React, {useContext, useState} from "react";
import Cart from "./Pages/Cart";

// a react context provider
// place the main export (<CartProvider>) wrapping around all children React Components.
//      1. In our Parent Componenet:
//              import {CartProvider} from "./CartContext"
// inside our children componenets - we want to
// 1. import {useCartContext} from "./CartContext"
// 2. inside our functional component code section:
//          const { cart, setCart, ... } = useCartContext();
//          and call cart, setCart, ... wherever we want!

const CartContext = React.createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);

  // if (!context) {
  //   throw new Error(
  //     "useCartContext must be called within a Provider component"
  //   );
  // }

  return context;
};

export function CartProvider({children}) {
  // values and functions we are allowing every component to access below:

  const [cart, setCart] = useLocalStorage("userLocalCart", []);
  const userCartCount = cart.length;

  const [prevCart, setPrevCart] = useLocalStorage("prevCart", cart);
  const [prevOrder, setPrevOrder] = useLocalStorage("prevOrder");

  const [orderPaid, setOrderPaid] = useState(false);

  const addNewItem = (newItem) => {
    setCart((prevItems) => {
      return [...prevItems, newItem];
    });
  };

  const [orderID, setOrderID] = useState();

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        userCartCount,
        addNewItem,
        orderID,
        setOrderID,
        prevCart,
        setPrevCart,
        prevOrder,
        setPrevOrder,
        orderPaid,
        setOrderPaid,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// function like useState but allows us to store our cart (and data) inside the user's local storage

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
