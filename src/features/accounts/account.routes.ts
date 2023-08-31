import { Router } from 'express';
import accountController from './account.controller';
import validateAccountDetails from '../../middleware/validate-account-details';

const {
  createAccountHandler,
  resolveAccountHandler,
  getAccountsHandler,
} = accountController

const accountRouter = Router();

accountRouter
  .route('/accounts')
  .post(validateAccountDetails, createAccountHandler)
  .get(resolveAccountHandler);

accountRouter.get('/all-accounts', getAccountsHandler);

export default accountRouter
