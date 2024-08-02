import { Router } from "express";
import { Response, Request, NextFunction } from "express";
import { Customers } from "../db/entities/Customers";
import { AppError } from "../errors/AppErrors";
import { createCustomer, deleteCustomer, updateCustomer } from "../controllers/customerController";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.body;

        if (!customer.name || !customer.mobilePhone) {
            throw new AppError("Missing required fields", 400, false);
        }
            const createdCustomer = await createCustomer(customer);
            res.status(201).json({
                success: true,
                message: "Customer created successfully",
                data: createdCustomer,
            })
        
    } catch (error) {
     next(error);   
    }
});
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await Customers.find()
        res.status(200).json({
            success: true,
            message: "Customers retrieved successfully",
            data: customers,
        })
    } catch (error) {
     next(error);   
    }
});
router.delete("/:id",deleteCustomer);

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerId = Number(req.params.id);
        const customer = req.body;
        if (!customer.name || !customer.mobilePhone) {
            throw new AppError("Missing required fields", 400, false);
        }
            const updatedCustomer = await updateCustomer(customerId, customer);
            res.status(200).json({
                success: true,
                message: "Customer updated successfully",
                data: updatedCustomer,
            })
        
    } catch (error) {
     next(error);   
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerId = Number(req.params.id);
        const customer = await Customers.findOne({where: {id: customerId}});
        res.status(200).json({
            success: true,
            message: "Customer retrieved successfully",
            data: customer,
        })
    } catch (error) {
     next(error);   
    }
}); 




export default router;