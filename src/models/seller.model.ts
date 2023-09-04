import { Model, model, Schema } from "mongoose";

export enum sellerStatus {
  active = "active",
  inactive = "inactive",
}

export enum level {
  one = '1',
  two = '2',
  three = '3'
};

export enum roleType {
  seller = 'seller',
  admin = 'admin',
  storeManager = 'storeManager',
  storeEmployee = 'storeEmployee'
};

export const sellerDetails = new Schema({
  access_level: { type: String, required: true, enum: Object.values(level) },
  role: { type: String, required: true, enum: Object.values(roleType)},
  phone_number: { type: String ,required : false},
  email: { type: String, required: true  },
  name: { type: String ,required : false},
  password: { type: String ,default : '00000000', required : false},
  profilePic: { type: String ,required : false},
  gstId: { type: String , required : true},
  status: { type: String, enum: Object.values(sellerStatus), default: sellerStatus.active },
  language: [{ type: String ,required : false}],
  document: [{
    name: { type: String, required: false },
    url: { type: String, required: false }
  }]
});

const Seller: Model<any> = model<any>("seller", sellerDetails);
export default Seller;
