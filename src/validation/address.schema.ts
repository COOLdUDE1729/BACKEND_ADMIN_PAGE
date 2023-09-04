import Joi from 'joi';
import { addressType } from '../models/address.model';
import { addressStatus } from '../models/address.model';

export const addressSchema = Joi.object({
  refId: Joi.string().required(),
  type: Joi.string().valid(...Object.values(addressType)).required(),
  status: Joi.string().valid(...Object.values(addressStatus)).default(addressStatus.active),
  addressLine1: Joi.string().required(),
  townORcity: Joi.string().required(),
  pincode: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required()
});
