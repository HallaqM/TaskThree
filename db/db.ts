import { DataSource } from "typeorm";
import { Customers } from "./entities/Customers.js";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "customers",
    synchronize: true,
    entities: [Customers]
});

export default AppDataSource;