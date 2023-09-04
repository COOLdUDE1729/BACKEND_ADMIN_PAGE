import {Model, model, Schema} from 'mongoose'

export enum addressType{
    user='user',
    seller='seller'
}

export enum addressStatus {
    active = "active",
    inactive = "inactive",
}
export const addressDetails = new Schema({
    refId: { type: String, required: true },
    type: { type: String, required: true, enum: Object.values(addressType) },
    status: { type: String, enum: Object.values(addressStatus), default: addressStatus.active },
    addressLine1: { type: String, required: true },
    townORcity: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true }
});

const Address: Model<any> = model<any>("address", addressDetails);
export default Address;