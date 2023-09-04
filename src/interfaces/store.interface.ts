import { Document, Types,Schema } from "mongoose";
import { StoreStatus } from "../models/store.model";
import { ICategoryDetails } from "./category.interface";

export interface IStoreCreate extends Document{
  sellerId: string;
  gstId: string;
  status: StoreStatus;
  addressDetails: {
    gpslocation?: {
      longitude?: string;
      latitude?: string;
    };
    addressLine1?: string;
    townORcity?: string;
    pinCode?: string;
    state?: string;
    country?: string;
  };
  categoryList?: (Schema.Types.ObjectId | ICategoryDetails)[];
}

export interface IStoreUpdate extends Document {
  status: StoreStatus;
  addressDetails: {
    gpslocation?: {
      longitude?: string;
      latitude?: string;
    };
    addressLine1?: string;
    townORcity?: string;
    pinCode?: string;
    state?: string;
    country?: string;
  };
  categoryList?: (Schema.Types.ObjectId | ICategoryDetails)[];
}
