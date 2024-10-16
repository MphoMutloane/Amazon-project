import React, { useEffect, useContext, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Products from "./components/Products";
import Home from "./components/Home";
import Header from "./components/layouts/Header";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import shoppingContext from "./context/shopping/shoppingContext";
import { auth } from "./Firebase"; 

const App = () => {
  const { setUser, user } = useContext(shoppingContext); // Moved useContext here
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser ? authUser : null);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, [setUser]);

  if (loading) { 
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            {user ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login" exact>
            {user ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route path="/products" exact>
            {user ? <Products /> : <Redirect to="/login" />}
          </Route>
          <Route path="/products/:id">
            {user ? <ProductDetails /> : <Redirect to="/login" />}
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
