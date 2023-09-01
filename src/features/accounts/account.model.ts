import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    dob: { type: String },
    account_type: { type: String },
    account_number: { type: Number },
    initial_balance: { type: Number }
  },
  {
    timestamps: true,
  },
)

const Account = mongoose.model('Account', accountSchema)
export default Account
