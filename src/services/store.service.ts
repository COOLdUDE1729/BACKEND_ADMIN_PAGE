import Store from "../models/store.model";
import { IStoreCreate, IStoreUpdate } from "../interfaces/store.interface";

export class StoreService {
  async createStore(data: IStoreCreate, language?: string) {
    const store = new Store({ data });
    return store.save();
  }

  async getAllStore(sellerId: string, limit: number, page: number, language?: string) {
    const stores = await Store.find({ sellerId: sellerId })
      .limit(limit)
      .skip(page * limit)
      .lean()
      .exec();
    return stores;
  }

  async getOneStore(sellerId: string, storeId: string, language?: string) {
    const store = await Store.findOne({ sellerId: sellerId, _id: storeId }).exec();
    return store;
  }

  async updateOneStore(sellerId: string, storeId: string, body: IStoreUpdate, language?: string) {
    const store = await Store.findOne({ sellerId: sellerId, _id: storeId }).exec();

    return await Store.updateOne(store._id, store);
  }

  async deleteStore(sellerId: string, storeId: string, language?: string) {
    const result = await Store.findOneAndUpdate({ sellerId: sellerId, _id: storeId }, { $set: { status: "inactive" } }, { new: true }).exec();
    return result;
  }

  //   async revokeStore(storeId: string, language?: string) {
  //     return await Store.findByIdAndRemove({ _id: storeId }).exec();
  //   }
}
