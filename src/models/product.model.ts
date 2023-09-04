import { Model, model, Schema } from "mongoose";
import Store from "./store.model";

import Brand from "./brand.model";
import Category from "./category.model";
import Seller from "./seller.model";

export enum productStatus {
  active = "active",
  inactive = "inactive"
}

export const productDetails = new Schema({
  //basic info
  gstId: { type: String, required: true },
  storeId: { type: Schema.Types.ObjectId, ref: Store , required: false},
  categoryId: [{
    type: Schema.Types.ObjectId,
    ref: Category,
    required: false
  }],

  brandId: {
    type: Schema.Types.ObjectId,
    ref: Brand,
    required: false
  },

  sellerId: { type: Schema.Types.ObjectId, ref: Seller, required: false },
  productName: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: false },
  status: { type: String, required: true, enum: Object.values(productStatus), default: productStatus.active },
  category: [{ type: String, required: false }],
  subcategory: [{ type: String, required: false }],
  tags: [{ type: String, required: false }],
  manufacturer: { type: String, required: false },

  //pricing and shipping
  price: { type: Number, required: true, min: 0 },
  isDiscount: { type: Boolean, required: false, default: true },
  shippingCharge: { type: Number, required: false, min: 0, default: 0 },

  image: {
    name: { type: String, required: true },
    url: { type: String, required: true }
  },


  discount: { type: Number, required: false, default: 0},
  inStock: { type: Boolean, default: true },
  stock: { type: Number, required: false },

  features: [{ type: String, required: false }],

  //seo
  metaTitle: { type: String, required: false },
  metaKeywords: [{ type: String, required: false }],
  metaDescription: { type: String, required: false },

  //rating
  rating: {
    count: { type: Number, required: false },
    rating: { type: String, required: false }
  },
  //misc
  attributes: [{ type: String, required: false }],

  weight: { type: String, required: false },
  height: { type: String, required: false },
  length: { type: String, required: false },
  width: { type: String, required: false },
  dimensions: { type: String, required: false },
  publisher: { type: String, required: false },
  language: { type: String, required: false }
});

const Product: Model<any> = model<any>("product", productDetails);
export default Product;
