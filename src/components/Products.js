import React from "react";
import "./Products.css";
import Product from "./Product";

const Products = () => {
  return (
    <>
    <div className="products_row">
      <Product
        id="1"
        title="Samsung Galaxy Fit3 Smart Watch, Grey"
        image="https://m.media-amazon.com/images/I/41ysEyi7ebL._AC._SR360,460.jpg"
        rating={4}
        price={59.99}
      />
      <Product
        id="2"
        title="Redragon Shiva K512 104 Key Membrane RGB Gaming Keyboard, Black"
        image="https://m.media-amazon.com/images/I/71w9I5LAUZL._AC_UL320_.jpg"
        rating={4}
        price={489.99}
      />
    </div>
    <div className="products_row">
      <Product
        id="3"
        title="Turtle Beach Recon 200 Gen 2 - White"
        image="https://m.media-amazon.com/images/I/71BIC4hPfzL._AC_SY450_.jpg"
        rating={2}
        price={1249.99}
      />
      <Product
        id="4"
        title="BRIGHTSTAR Contemporary Soft Cushioned Ergonomic Gaming Chair With 2D Armrest - RED"
        image="https://m.media-amazon.com/images/I/418gsaegCML._AC_SX679_.jpg"
        rating={3}
        price={2849.99}
      />
      <Product
        id="5"
        title="Dell P2722H P Series Full HD Class LCD 27-Inch Monitor"
        image="https://m.media-amazon.com/images/I/71SsKQTf8NL._AC_SL1500_.jpg"
        rating={4}
        price={4188.99}
      />
    </div>
    <div className="products_row">
      <Product
        id="6"
        title="Sandisk 128 GB Cruzer Blade USB Flash Drive"
        image="https://m.media-amazon.com/images/I/61DjwgS4cbL._AC_SX300_SY300_.jpg"
        rating={3}
        price={199.99}
      />
      <Product
        id="7"
        title="Fujifilm Instax Mini 12 Instant Film Camera, Lilac Purple"
        image="https://m.media-amazon.com/images/I/61Aj10ec8KL._AC_SY450_.jpg"
        rating={5}
        price={1459.99}
      />
      <Product
        id="8"
        title="15.6inch Portable Monitor Triple Screen Display Extender"
        image="https://m.media-amazon.com/images/I/71hTtKExHQL._AC_SX569_.jpg"
        rating={1}
        price={11999.99}
      />
      <Product
        id="9"
        title="JBL Wave Buds True Wireless Bluetooth Earbuds, White"
        image="https://m.media-amazon.com/images/I/51Lr1mPUvIL._AC._SR360,460.jpg"
        rating={4}
        price={888.99}
      />
    </div>
    </>
    
  );
};

export default Products;
