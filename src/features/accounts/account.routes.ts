import { Router } from 'express';
import accountController from './account.controller';
import validateAccountDetails from '../../middleware/validate-account-details';

const { createAccountHandler } = accountController;

const accountRouter = Router();

accountRouter.post("/accounts", validateAccountDetails, createAccountHandler);

export default accountRouter