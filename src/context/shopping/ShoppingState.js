import React, { useReducer } from "react";
import shoppingContext from "./shoppingContext";
import { shoppingReducer } from "./shoppingReducer";

const ShoppingState = ({ children }) => {
  const initialState = {
    basket: [],
    user: null,
  };

  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  const setUser = (user) => {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };

  const addToBasket = (item) => {
    dispatch({
      type: "ADD_TO_BASKET",
      payload: item,
    });
  };

  return (
    <shoppingContext.Provider
      value={{
        basket: state.basket,
        user: state.user,
        setUser,
        addToBasket,
      }}
    >
      {children}
    </shoppingContext.Provider>
  );
};

export default ShoppingState;
