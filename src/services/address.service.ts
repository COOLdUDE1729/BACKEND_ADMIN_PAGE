import { IAddress, IAddressUpdate } from '../interfaces/address.interface';
import Address from '../models/address.model';
import { addressType } from '../models/address.model';

export class AddressService{

  async createAddress(data: IAddress, language?: string) {
      const address = new Address(data);
      return address.save();
  }

  async getAllAddress(limit:number,page : number,language ?: string) {
    const addresses =  await Address.find().limit(limit)
                          .skip(page * limit)
                          .lean()
                          .exec();
    return addresses;
  }

  async getAddress( refId: string, type: addressType, language ?: string ) {
    const addresses = await Address.find({type:type, refId:refId}).exec();
    return addresses;
  }

  async updateOneAddress( addressId: string , body: IAddressUpdate, language ?: string ){
    const address = await Address.findOne({_id:addressId}).exec();
    if(body.addressLine1) address.addressLine1 = body.addressLine1;
    if(body.townORcity) address.townORcity = body.townORcity;
    if(body.pincode) address.pincode = body.pincode;
    if(body.state) address.state = body.state;
    return await Address.updateOne(address._id, address);
  }

  async deleteAddress(addressId: string, language ?: string){
    const result = await Address.findOneAndUpdate(
      { _id: addressId },
      { $set: { status: "inactive" } },
      { new: true }
    ).exec();
  
    return result;
  } 

  async revokeAddress( addressId : string , language ?: string){
    return await Address.findByIdAndRemove({_id:addressId}).exec();
  }
}