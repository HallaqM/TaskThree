import { NextFunction, Request, Response} from "express";
import { Customers } from "../db/entities/Customers.js";
import { AppError } from "../errors/AppErrors.js";


const createCustomer = async (payload: any) => {

    const customer = await Customers.findOne({where: {mobilePhone: payload.mobilePhone}});
    if(customer){
        new AppError("Customer already exists", 409, false)}
    
    const newCustomer = await Customers.create({
        name: payload.name,
        mobilePhone: payload.mobilePhone,
        balance: 0
    }).save();
   
    return newCustomer;
}   



const deleteCustomer =  async (res: Response,req:Request, payload: any) => {
    try {
        const customerId = Number(req.params.id);
        const customer = await Customers.findOne({where: {id: customerId}});
        if(!customer){
            throw new AppError("Customer not found", 404, false);
        }
        
        await Customers.delete(customerId);
        
         res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
            data: customer,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting customer",
            data: error,
        })
        throw new AppError("Error deleting customer", 500, false);
        
    }
    }

const updateCustomer = async (customerId: number, payload: any) => {
    try {
        const customer = await Customers.findOne({where: {id: customerId}});
        if(!customer){
            throw new AppError("Customer not found", 404, false);
        }
        await Customers.update(customerId, {
            name: payload.name,
            mobilePhone: payload.mobilePhone,
            balance: payload.balance,
        });
        return customer;
    } catch (error) {
        throw new AppError("Error updating customer", 500, false);
    }
}   

export {createCustomer, deleteCustomer, updateCustomer}
