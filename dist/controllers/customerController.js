"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomer = exports.deleteCustomer = exports.createCustomer = void 0;
const Customers_js_1 = require("../db/entities/Customers.js");
const AppErrors_js_1 = require("../errors/AppErrors.js");
const createCustomer = async (payload) => {
    const customer = await Customers_js_1.Customers.findOne({ where: { mobilePhone: payload.mobilePhone } });
    if (customer) {
        new AppErrors_js_1.AppError("Customer already exists", 409, false);
    }
    const newCustomer = await Customers_js_1.Customers.create({
        name: payload.name,
        mobilePhone: payload.mobilePhone,
        balance: 0
    }).save();
    return newCustomer;
};
exports.createCustomer = createCustomer;
const deleteCustomer = async (res, req, payload) => {
    try {
        const customerId = Number(req.params.id);
        const customer = await Customers_js_1.Customers.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new AppErrors_js_1.AppError("Customer not found", 404, false);
        }
        await Customers_js_1.Customers.delete(customerId);
        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
            data: customer,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting customer",
            data: error,
        });
        throw new AppErrors_js_1.AppError("Error deleting customer", 500, false);
    }
};
exports.deleteCustomer = deleteCustomer;
const updateCustomer = async (customerId, payload) => {
    try {
        const customer = await Customers_js_1.Customers.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new AppErrors_js_1.AppError("Customer not found", 404, false);
        }
        await Customers_js_1.Customers.update(customerId, {
            name: payload.name,
            mobilePhone: payload.mobilePhone,
            balance: payload.balance,
        });
        return customer;
    }
    catch (error) {
        throw new AppErrors_js_1.AppError("Error updating customer", 500, false);
    }
};
exports.updateCustomer = updateCustomer;
