import React, { useState, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import {auth} from "../Firebase";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();


  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .then(auth => {
      history.push("/");
    }).catch(error => alert(error.message));

  };

  const register = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then(auth => {
      if(auth) {
        history.push("/");
      }
    }).catch(error => alert(error.message));

  }

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://www.svgrepo.com/show/303264/amazon-2-logo.svg"
          alt="Amazon logo"
          className="login_logo"
        />
      </Link>
      <div className="login_container">
        <h1>Sign-in</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            onChange = {(e) => setEmail(e.target.value)}
            value = {email}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange = {(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login_signInButton" onClick={signIn}>
            Sign In
          </button>
        </form>
        <p>
          By signing in you agree to the Amazon Clone Terms & Conditions...
        </p>
        <button className="login_registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
