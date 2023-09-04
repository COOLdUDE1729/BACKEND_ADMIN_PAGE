import { Model, model, Schema } from "mongoose";
import Category from "./category.model";
import Seller from "./seller.model";

export enum StoreStatus {
  active = "active",
  inactive = "inactive"
}

export const storeDetails = new Schema({
  sellerId: { type: Schema.Types.ObjectId, ref: Seller, required: true },
  gstId: { type: String, unique: true, required: true },
  status: { type: String, required: true, enum: Object.values(StoreStatus), default: StoreStatus.active },
  addressDetails: {
    gpslocation: {
      longitude: { type: String, required: false },
      latitude: { type: String, required: false }
    },
    addressLine1: { type: String, required: false },
    townORcity: { type: String, required: false },
    pinCode: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: false }
  },
  categoryList: [
    {
      type: Schema.Types.ObjectId,
      ref: Category
    }
  ]
});

const Store: Model<any> = model<any>("store", storeDetails);
export default Store;
