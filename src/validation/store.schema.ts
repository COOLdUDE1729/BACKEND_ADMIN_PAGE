import Joi from "joi";

const addressDetailsSchema = Joi.object({
  gpslocation: Joi.object({
    longitude: Joi.string().optional(),
    latitude: Joi.string().optional()
  }).optional(),
  addressLine1: Joi.string().optional(),
  townORcity: Joi.string().optional(),
  pinCode: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional()
}).optional();

export const storeSchema = Joi.object({
  gstId: Joi.string().required(),
  addressDetails: addressDetailsSchema,
  categoryList: Joi.array().items(Joi.string()).optional()
});
