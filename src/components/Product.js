import React, { useContext } from "react";
import "./Product.css";
import ShoppingContext from "../context/shopping/shoppingContext";

const Product = ({ id, image, title, rating, price }) => {
  const shoppingContext = useContext(ShoppingContext);
  const { addToBasket } = shoppingContext;

  const addToBasketHandler = () => {
    const item = { id, image, title, rating, price };
    addToBasket(item);  // No need to wrap it inside `item: { ... }`
  };

  return (
    <div className="product">
      <img src={image} alt="" />
      <div className="product_info">
        <p>{title}</p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        <div>
          <p className="product_price">${price}</p>
        </div>
      </div>
      <button className="product_button" onClick={addToBasketHandler}>
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
