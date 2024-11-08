import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Home from "./components/Home";
import Header from "./components/layouts/Header";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ShoppingContext from "./context/shopping/shoppingContext";
import { auth } from "./Firebase"; 
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";
import Payment from "./components/layouts/Payment";

const promise = loadStripe(
  "pk_test_51QHhZPBBTU6giyCeHXP7O1VizNOwVP0LCXPR1zXzcEX8J0VKHCg27dS4Y6lsSB49SgVm1EITtPYKFvnJsy6vrpqZ001zX1Frxc"
);

const App = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { setUser } = shoppingContext; 
  // const [loading, setLoading] = useState(true); 

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("User is ->", authUser);

      if(authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
  }, []);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     setUser(authUser ? authUser : null);
  //     setLoading(false); 
  //   });

  //   return () => unsubscribe();
  // }, [setUser]);

  // if (loading) { 
  //   return (
  //     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  //       <h2>Loading...</h2>
  //     </div>
  //   );
  // }

  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact> 
            <Redirect to="/home" />
          </Route>
          <Route path="/home"> 
            <Home />
          </Route>
          <Route path="/products" exact> 
            <Products />
          </Route>
          <Route path="/products/:id"> 
            <ProductDetails />
          </Route>
          <Route path="/checkout"> 
            <Checkout />
          </Route>
          <Route path="/payment"> 
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login"> 
            <Login />
          </Route>
          <Route path="*"> 
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;


