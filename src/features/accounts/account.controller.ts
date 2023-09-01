import { NextFunction, Request, Response } from 'express';
import Constant from '../../constant'
import Account from './account.model';
import Chance from 'chance';
import catchAsync from '../../common/error-handler/CatchAsyncError';

const Messages = Constant.messages;

class AccountController {
    createAccountHandler = catchAsync(
        async(req: Request, res: Response, next: NextFunction) => {
            const { fullname, dob, account_type, initial_balance } = req.body;
            const chance = new Chance();
            const accountNo = chance.natural({ min: 5000000000, max: 5099999999 });
            
            //check if the user already exists
            const account = await Account.findOne({fullname});
            if(account) {
                return res.status(200).send({
                    message: `${Messages.accountExist} ${account.account_number}`,
                    status: false
                });
            }
            
            const data = {
                fullname, 
                dob,
                account_type,
                account_number: accountNo,
                initial_balance
            };
            const newAccount = new Account(data);
            await newAccount.save();

            res.status(201).send({
                message: Messages.accountCreated,
                data: {
                    'Account details': {
                        account_name:data.fullname,
                        account_number: data.account_number,
                        account_type: data.account_type,
                        initial_balance: data.initial_balance
                    }
                },
                status: true
            });
        }
    )

    resolveAccountHandler = catchAsync(async (req: Request, res: Response, next:NextFunction) =>{
        const { account_number } = req.body;
        // Check if account_number is empty or null
        if (!account_number) {
            return res.status(400).send({
                message: "Account number is required.",
                status: false
            });
        }
        const account = await Account.findOne({ account_number }).select('-createdAt -updatedAt -__v');

        if(account){
            return res.status(200).send({
                message: Messages.accountRetrieved,
                data: {"Account details": account},
                status: true
            })
        }
        return res.status(404).send({
            message: Messages.accountNotExist,
            status: false
        });
    })

    getAccountsHandler = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        const accounts = await Account.find().select('-createdAt -updatedAt -__v');
        if (accounts.length === 0) {
            return res.status(404).json({
                message: Messages.noAccounts,
                status: false
            });
        }

        return res.status(200).json({
            message: Messages.foundAccounts,
            data: accounts,
            status: true
        });
    })

}

export default new AccountController()