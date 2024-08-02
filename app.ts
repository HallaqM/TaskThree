import { Request, Response, Express } from "express";
import express from 'express'
import dataSource from './db/db.js';
import customerRoutes from "./routes/customerRoutes.js";



const app: Express = express();
const PORT: Number = 3000;





app.use(express.json());
app.use("/customers", customerRoutes);


let Server = app.listen(PORT, () => {

    console.log("port is running on the " + PORT);
});

dataSource.initialize().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});







