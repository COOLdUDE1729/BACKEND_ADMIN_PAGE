import { NextFunction, Request, Response } from 'express';
import { login, updatePassword } from '../../validation/login.schema';
import { LoginService } from './../../services/login.service';
import { generateToken } from '../../middlewares/security.middleware';


export class LoginController {
  // @validateRequestBody(login)
  static async Login(request: Request, response: Response, next: NextFunction): Promise<void> {
    
    try {
      const language: any = request.headers['content-lang'] ?? 'en';
      const result: any = await new LoginService().login({ ...request.body});
      // generate token
      console.log(result)
      const token = generateToken(request, response, next, result.UserData);
      console.log(token)
      // response.cookie('jwt', token, {httpOnly: true, maxAge:24*60*60*1000});
      response.status(201).json(result.UserData);
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  // @validateRequestBody(updatePassword)
  static async updatePassword(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers['content-lang'] ?? 'en';
      const result: any = await new LoginService().passwordUpdate({ ...request.body});
      response.status(201).json(result);
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }
}