import { NextFunction, Request, Response } from 'express';
import { BrandService } from '../../services/brand.service';

export class BrandController{
    static async addBrand(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
          const result: any = await new BrandService().addBrand({ ...request.body});
          response.status(201).json(result);
        } catch (err) {
          const error = JSON.parse(err.message);
          next({ code: error.code, message: error.message, error: error.error });
        }
    }
 
    static async getBrand(request: Request, response: Response, next: NextFunction): Promise<void>{
        try {
            const result = await new BrandService().getBrand(request.params.name);
            response.json(result);
          } catch (err) {
            const e: any = err ?? new Error(null);
            const error = JSON.parse(err.message);
            next({ code: error.code, message: error.message, error: error.error });
          }
    } 

    static async deleteBrand(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
          const language: any = request.headers['content-lang'] ?? 'en';
          const result = await new BrandService().deleteBrand(request.params._id);
          response.json(result);
        } catch (err) {
          const e: any = err ?? new Error(null);
          const error = JSON.parse(err.message);
          next({ code: error.code, message: error.message, error: error.error });
        }
    }    
}