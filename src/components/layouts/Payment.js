import React, { useContext, useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import "./Payment.css";
import axios from "../../axios";
import ShoppingContext from "../../context/shopping/shoppingContext";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../../Firebase";

const Payment = () => {
    const shoppingContext = useContext(ShoppingContext);
    const { basket, user, getBasketTotal, emptyBasket } = shoppingContext;
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const total = Math.round(getBasketTotal(basket) * 100); // Convert to integer cents
            try {
                const response = await axios({
                    method: "POST",
                    url: `/payment/create?total=${total}`,
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error("Error fetching client secret:", error);
            }
        };
        getClientSecret();
    }, [basket]);
    

    console.log("The secret is => ", clientSecret);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        }).then(({ paymentIntent }) => {
            // Payment intent = payment confirmation
            db.collection("user")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({ 
                basket: basket, 
                amount: paymentIntent.amount, 
                created: paymentIntent.created, 
            });
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            // Empty the basket
            emptyBasket();
            // Redirect the user to order page
            history.push("/orders");
        }).catch((error) => {
            setError(`Payment failed: ${error.message}`);
            setProcessing(false);
        });
    };

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout <Link to="/checkout">{basket?.length} items</Link>
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>123 ReactJS Road</p>
                        <p>Cape Town, RSA</p>
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review item and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map((item) => (
                            <CheckoutProduct 
                                key={item.id} 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_price_container">
                                <CurrencyFormat 
                                    renderText={(value) => <h3>Order Total: {value}</h3>}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
