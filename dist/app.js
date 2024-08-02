"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_js_1 = __importDefault(require("./db/db.js"));
const customerRoutes_js_1 = __importDefault(require("./routes/customerRoutes.js"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use("/customers", customerRoutes_js_1.default);
let Server = app.listen(PORT, () => {
    console.log("port is running on the " + PORT);
});
db_js_1.default.initialize().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});
