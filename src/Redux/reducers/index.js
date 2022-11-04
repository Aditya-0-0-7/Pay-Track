import { combineReducers } from "redux";
import User from './user';
import TransactionData from './transactionData';

const rootReducer = combineReducers({
  User,TransactionData
});

export default rootReducer;