import * as Joi from 'joi';

export const login: any = Joi.object({
  email: Joi.string().min(1).presence('required'),
  password: Joi.string().min(8).required()
});

export const updatePassword: any = Joi.object({
  userId: Joi.string().min(1).presence('required'),
  old_password: Joi.string().min(8).required(),
  new_password: Joi.string().min(8).required()
});

