import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    fullname: { type: String, unique: true },
    dob: { type: String },
    account_type: { type: String },
    account_number: { type: Number },
    intial_balance: { type: Number }
  },
  {
    timestamps: true,
  },
)

const Account = mongoose.model('Account', accountSchema)
export default Account
