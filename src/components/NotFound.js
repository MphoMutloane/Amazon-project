import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Link to="/">
      <div className="not_found">
        <div>
          <img
            className="top"
            src="https://images-na.ssl-images-amazon.com/images/G/01/error/title._TTD_.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/01/error/5._TTD_.jpg"
            alt=""
          />
        </div>
      </div>
    </Link>
  );
};

export default NotFound;
