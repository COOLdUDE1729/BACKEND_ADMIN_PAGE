const Joi = require("joi");
import { productStatus } from "../models/product.model";

const productStatusValues = Object.values(productStatus);

const productSchema = Joi.object({
  gstId: Joi.string().required(),
  storeId: Joi.string().required(),
  status: Joi.string()
    .valid(...productStatusValues)
    .required(),
  category: Joi.array().items(Joi.string()),
  subcategory: Joi.array().items(Joi.string()),
  productName: Joi.string().required(),

  bucketInfo: Joi.object({
    name: Joi.string().required(),
    url: Joi.string().required()
  }).required(),
  description: Joi.string().required(),

  price: Joi.number().min(0),
  discount: Joi.number(),
  inStock: Joi.boolean().default(true),
  stock: Joi.number(),

  features: Joi.array().items(Joi.string()),

  weight: Joi.string(),
  height: Joi.string(),
  length: Joi.string(),
  width: Joi.string(),
  dimensions: Joi.string(),
  publisher: Joi.string(),
  language: Joi.string()
});

module.exports = productSchema;
