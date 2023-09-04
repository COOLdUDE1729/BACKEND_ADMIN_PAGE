import { NextFunction, Request, Response } from "express";
import { StoreService } from "../../services/store.service";

export class StoreController {
  static async create(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers["content-lang"] ?? "en";
      const result: any = await new StoreService().createStore({ sellerId: request.params.sellerId, ...request.body }, language);
      response.status(201).json(result);
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getAll(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = "0", page = "1" } = request.query;
      const l = parseInt(limit.toString());
      const p = parseInt(page.toString());
      const result = await new StoreService().getAllStore(request.params.sellerId, l, p);
      const stores: any = await new StoreService().getAllStore(request.params.sellerId, 0, 0);
      response.status(200).json({ totalCount: stores.length, page: Number(page) ?? 0, limit: Number(limit) ?? 0, data: result, totalStores: stores });
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getOne(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers["content-lang"] ?? "en";
      const result = await new StoreService().getOneStore(request.params.sellerId, request.params._id, language);
      response.json(result);
    } catch (err) {
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  // @validateRequestBody(StoreUpdate)
  static async update(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers["content-lang"] ?? "en";
      const result = await new StoreService().updateOneStore(request.params.sellerId, request.params._id, request.body, language);
      response.json(result);
    } catch (err) {
      console.log({ err });
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async delete(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers["content-lang"] ?? "en";
      const result = await new StoreService().deleteStore(request.params.sellerId, request.params._id, language);
      response.json(result);
    } catch (err) {
      console.log({ err });
      const e: any = err ?? new Error(null);
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  //   static async revoke(request: Request, response: Response, next: NextFunction): Promise<void> {
  //     try {
  //       const language: any = request.headers["content-lang"] ?? "en";
  //       const result = await new StoreService().revokeStore(request.params._id, language);
  //       response.json(result);
  //     } catch (err) {
  //       const e: any = err ?? new Error(null);
  //       const error = JSON.parse(err.message);
  //       next({ code: error.code, message: error.message, error: error.error });
  //     }
  //   }
}
