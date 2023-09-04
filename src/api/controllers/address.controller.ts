import { NextFunction, Request, Response } from 'express';
import { AddressService } from '../../services/address.service';
import { guard } from '../../middlewares/jwt-gaurd.middleware';
import dotenv from "dotenv";
import { userAdd, userCreation, userUpdate } from './../../validation/user.schema';
import { addressType } from '../../models/address.model';
dotenv.config();
const secretKey = process.env.ACCESS_TOKEN_SECRET;

export class AddressController{
    
  // @validateRequestBody(addressCreation)
  static async createAddress(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers['content-lang'] ?? 'en';
      const result: any = await new AddressService().createAddress({ ...request.body}, language);
      response.status(201).json(result);
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getAllAddress(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = '10', page = '1' } = request.query;
      const l = parseInt(limit.toString());
      const p = parseInt(page.toString());
      const result = await new AddressService().getAllAddress(l, p);
      const addresses : any= await new AddressService().getAllAddress(0, 0);
      response.status(200).json({ totalCount: addresses.length, page: Number(page) ?? 0, limit: Number(limit) ?? 0, data: result, totalUsers: addresses});
     
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getAddress(request: Request, response: Response, next: NextFunction): Promise<void>{
    const type: addressType = request.params.type as addressType;
    try {
      const language: any = request.headers['content-lang'] ?? 'en';
      const result = await new AddressService().getAddress(request.params.refId, type, language);
      response.json(result);
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  // @validateRequestBody(addressUpdate)
  static async updateAddress(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers['content-lang'] ?? 'en';
      const result = await new AddressService().updateOneAddress(request.params._id , request.body, language);
      response.json(result);
    } catch (err) {
      console.log({ err });
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async deleteAddress(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers['content-lang'] ?? 'en';
      const result = await new AddressService().deleteAddress(request.params._id, language);
      response.json(result);
    } catch (err) {
      console.log({ err });
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async revokeAddress(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers['content-lang'] ?? 'en';
      const result = await new AddressService().revokeAddress(request.params._id , language);
      response.json(result);
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }
}