const express = require("express");
const logger = require("morgan");

const app = express();

const indexRouter = require("./routes/index");

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);

// Not found error handler
app.use((req, res, next) => {
  // Create 404 error
  const err = new Error("Not Found");
  err.statusCode = 404;
  err.message = "Page Not Found";

  // Pass error to next middleware
  next(err);
});

// Error handler Middleware
app.use((err, req, res, next) => {
  // Verify status code
  const statusCode = err.statusCode || 500;

  // send response
  res.status(statusCode).json({
    message: err.message || "System Error",
  });
  console.log(err);
});

module.exports = app;
