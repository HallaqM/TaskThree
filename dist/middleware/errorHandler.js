"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultErrorHandler = exports.customErrorHandler = void 0;
const AppErrors_js_1 = require("../errors/AppErrors.js");
// Custom Error handler middleware 
function customErrorHandler(err, req, res, next) {
    if (err instanceof AppErrors_js_1.AppError) {
        res.status(err.httpCode).json({ success: false, error: err.message });
    }
    else {
        // Handle other errors here
        console.error("Error :( => ", err);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}
exports.customErrorHandler = customErrorHandler;
// default error handler
function DefaultErrorHandler(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    console.log("Catch Error :(( => ", err);
    res.status(err.status || 500).send({ error: "Internal server error" });
}
exports.DefaultErrorHandler = DefaultErrorHandler;
