import { Model, model, Schema } from "mongoose";
import { PaymentMethod } from "./../interfaces/user.interface";

export enum userStatus {
  active = "active",
  inactive = "inactive",
}
export const userDetails = new Schema({
  phone_number: { type: String ,required : false},
  email: { type: String, unique: true  },
  name: { type: String ,required : true},
  profilePic: { type: String ,required : false},
  role: { type: String, default: "customer" },
  access_level: { type: String, default: "1" },
  password: { type: String ,default : '00000000', required : false},
  status: { type: String, enum: Object.values(userStatus), default: userStatus.active },
  language: [{ type: String ,required : false}],
  paymentDetails: {
    bankName: { type: String ,required : false},
    bankAddress: { type: String ,required : false},
    accountNumber: { type: String ,required : false},
    ifscCode: { type: String ,required : false},
    custId: { type: String ,required : false},
    paymentMethod: { type: String ,enum: Object.values(PaymentMethod)},
  }
});

const User: Model<any> = model<any>("user", userDetails);
export default User;
