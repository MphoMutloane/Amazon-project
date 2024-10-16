import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const isValidEmail = (email) => {
    // const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return re.test(email);
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const authUser = await signInWithEmailAndPassword(auth, email, password);
      history.push("/");
    } catch (error) {
      setError(error.message);
      console.error("Sign in error:", error.message);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const authUser = await createUserWithEmailAndPassword(auth, email, password);
      history.push("/");
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error.message);
    }
  };

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
        {error && <p className="error-message">{error}</p>} 
        <form>
          <h5>Email</h5>
          {/* <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => 
            setPassword(e.target.value)}
          />
          <input type="email" value={email} onChange={(e) => setPassword(e.target.value)} />

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
