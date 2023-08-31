import { Request, Response, NextFunction } from "express";
import Constant from "../constant";
import Joi from "joi";

const Messages = Constant.messages;

const Schema = Joi.object({
    fullname: Joi.string().trim().required().min(5),
    dob: Joi.date().less('now').required(),
    account_type: Joi.string().trim().valid('Savings', 'Current', 'Checking'),
    initial_balance: Joi.number().positive().required(),
    });
    
const validateAccountDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { fullname, dob, account_type, initial_balance } = req.body;
        await Schema.validateAsync(req.body);
        next();
    } catch (error: any) {
        // Extract and format the custom error messages
        if (error.details) {
            const err = error.details[0].message;
            const message = err.replace(/"/g, '');
            return res.status(400).send({message, status: false});
          } else {
            return res.status(500).send({message: Messages.serverError , status: false});
        }
    }
};

export default validateAccountDetails;