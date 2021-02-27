const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/.env" });

const connectDb = require("./config/db");
const userRoutes = require("./routes/users.route");

// Connect DB

const app = express();

connectDb();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error(
        "Requested resource not found! Supported resources are /adverts, /bookings, /cabins and /users"
    );
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500).json({
        status: error.status,
        error: error.message,
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
