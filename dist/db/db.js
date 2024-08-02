"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Customers_js_1 = require("./entities/Customers.js");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "customers",
    synchronize: true,
    entities: [Customers_js_1.Customers]
});
exports.default = AppDataSource;
