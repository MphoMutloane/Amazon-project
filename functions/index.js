/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51QHhZPBBTU6giyCeZQzDBIWmDY6rADc5LvKAaOBBe3tCox2muED2SebjSOYiia65s675dDtFmFpojV0x4AG81SzG00lXwioUye",
);

// APP Config
const app = express();

// Middleware
app.use(cors({origin: true}));
app.use(express.json());

// API Routes
app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/payment/create", async (req, res) => {
    const total = req.query.total;
  
    console.log("Payment Request Received for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({ amount: total, 
        currency: "usd",
    });
    // If ok created
    res.status(201).send({ clientSecret: paymentIntent.client_secret });
});
  
// Listen commands
exports.api = onRequest(app);
