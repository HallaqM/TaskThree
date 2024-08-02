"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Customers_1 = require("../db/entities/Customers");
const AppErrors_1 = require("../errors/AppErrors");
const customerController_1 = require("../controllers/customerController");
const router = (0, express_1.Router)();
router.post("/", async (req, res, next) => {
    try {
        const customer = req.body;
        if (!customer.name || !customer.mobilePhone) {
            throw new AppErrors_1.AppError("Missing required fields", 400, false);
        }
        const createdCustomer = await (0, customerController_1.createCustomer)(customer);
        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: createdCustomer,
        });
    }
    catch (error) {
        next(error);
    }
});
router.get("/", async (req, res, next) => {
    try {
        const customers = await Customers_1.Customers.find();
        res.status(200).json({
            success: true,
            message: "Customers retrieved successfully",
            data: customers,
        });
    }
    catch (error) {
        next(error);
    }
});
router.delete("/:id", customerController_1.deleteCustomer);
router.put("/:id", async (req, res, next) => {
    try {
        const customerId = Number(req.params.id);
        const customer = req.body;
        if (!customer.name || !customer.mobilePhone) {
            throw new AppErrors_1.AppError("Missing required fields", 400, false);
        }
        const updatedCustomer = await (0, customerController_1.updateCustomer)(customerId, customer);
        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: updatedCustomer,
        });
    }
    catch (error) {
        next(error);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const customerId = Number(req.params.id);
        const customer = await Customers_1.Customers.findOne({ where: { id: customerId } });
        res.status(200).json({
            success: true,
            message: "Customer retrieved successfully",
            data: customer,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
