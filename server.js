const express = require('express');
const logger = require('morgan');



const app = express();
const port = process.env.PORT || 3000;


app.use(logger('dev'));
app.use(express.json());


// Not found error handler
app.use((req, res, next) => {
    // Create 404 error
    const error = new Error('Not Found');
    error.statusCode = 404;

    // Pass error to next middleware
    next(error);
});


// Error handler Middleware 
app.use((err, req, res, next) => {
    // Verify status code
    const statusCode = err.statusCode || 500;

    // send response
    res.status(statusCode).json({
        status: 'error',
        message: err.message
    });
});

app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});