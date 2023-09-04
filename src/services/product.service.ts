import Product from "./../models/product.model";
import ProductReview from "../models/product.review.model";
import { IProduct, IProductUpdate } from "./../interfaces/product.interface";
import { IpOptions } from "joi";

export class ProductService {
  async create(data: IProduct): Promise<IProduct> {
    const product = new Product(data);
    return product.save();
  }

  async getAll(storeId: string, sellerId: string, limit: number, page: number): Promise<IProduct[] | null> {
    const products = await Product.find({ storeId, sellerId })
      .populate("brandId")
      // .populate('categoryId')
      .limit(limit)
      .skip(limit * page)
      .lean()
      .exec();
    return products as IProduct[];
  }
  async getAll2(limit: number, page: number): Promise<IProduct[] | null> {
    const products = await Product.find()
      .populate("brandId")
      // .populate('categoryId')
      .limit(limit)
      .skip(limit * page)
      .lean()
      .exec();
    return products as IProduct[];
  }

  async getOne(storeId: string, sellerId: string, productId: string): Promise<IProduct | null> {
    return (
      Product.findOne({ storeId: storeId, sellerId, _id: productId })
        .populate("brandId")
        // .populate('categoryId')
        .exec()
    );
  }
  async getOne2(productId: string): Promise<IProduct | null> {
    return (
      Product.findOne({ _id: productId })
        .populate("brandId")
        // .populate('categoryId')
        .exec()
    );
  }

  async update(storeId: string, sellerId: string, productId: string, data: IProductUpdate): Promise<IProduct | null> {
    return await Product.findOneAndUpdate({ storeId: storeId, sellerId, _id: productId }, data, { new: true }).exec();
  }

  async delete(storeId: string, sellerId: string, productId: string): Promise<void> {
    return await Product.findOneAndUpdate({ storeId: storeId, sellerId, _id: productId, $set: { status: "inactive" } }, { new: true }).exec();
  }

  async revoke(productId: string): Promise<void> {
    return await Product.findByIdAndRemove(productId).exec();
  }

  // async getByLettersSuggestions(letters: string): Promise<String[] | null> {
  //   const regex = new RegExp(letters, "i");
  //   const products = await Product.find({ name: regex }).limit(10).exec();
  //   const suggestions = products.map((product) => product.name);
  //   return suggestions;
  // }

  async getByLetters(letters: string, limit: number, page: number): Promise<IProduct[] | null> {
    const regex = new RegExp(letters, "i");
    const products = await Product.find({ name: regex })
      .limit(limit)
      .skip(limit * page)
      .lean()
      .exec();
    return products as IProduct[];
  }

  async getByFilters(sortBy: string, filters: Record<string, any>, limit: number, page: number): Promise<IProduct[]> {
    try {
      const { minPrice, maxPrice, categories, tags, status, minDiscount, brand } = filters;

      const query: Record<string, any> = {};

      if (minPrice !== undefined && maxPrice !== undefined) {
        query.price = { $gte: minPrice, $lte: maxPrice };
      }

      if (categories && categories.length > 0) {
        query.categories = { $in: categories };
      }

      if (tags && tags.length > 0) {
        query.tags = { $in: tags };
      }

      if (status !== undefined) {
        query.status = status;
      }

      if (minDiscount !== undefined) {
        query.discount = { $gte: minDiscount };
      }

      if (brand !== undefined) {
        query.brand = brand;
      }

      const products = await Product.find(query)
        .limit(limit)
        .skip(limit * page)
        .sort(sortBy)
        .lean()
        .exec();

      return products as IProduct[];
    } catch (error) {
      throw new Error(JSON.stringify({ code: 500, message: "Internal Server Error", error }));
    }
  }


  async getAllOffers(limit:number,page : number,language ?: string) {
    const offers =  await Product.find({ discount: { $gt: 0 }})
                          .limit(limit)
                          .skip(page * limit)
                          .lean()
                          .exec();
    return offers;
  }

  async deleteOffer(productId: string){
    const result = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: { discount: 0 } },
      { new: true }
    ).exec();
  
    return result;
  }
}
