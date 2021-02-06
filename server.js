const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Connect DB

// Middleware

// Routes

// Error handling

const PORT = process.env.PORT || 8000;

app.listen((PORT) => {
    console.log(`Server listening on port: ${PORT}`);
});
