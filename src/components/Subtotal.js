import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NumericFormat } from "react-number-format";  // Updated import
import "./Subtotal.css";
import ShoppingContext from "../context/shopping/shoppingContext";

const Subtotal = () => {
  const history = useHistory();
  const shoppingContext = useContext(ShoppingContext);
  const { basket, getBasketTotal } = shoppingContext;

  return (
    <div className="subtotal">
      <NumericFormat
        value={getBasketTotal(basket || [])}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
      />
      <button onClick={() => history.push("/payment")}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
