import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom.error";
import { JwtAdapter } from "../configurations/jwt-adapter";
import { UserModel } from "../data/mongodb/models/user.model";

export class TokenMiddleware {
  static validateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //Define authentication header
      const authorization = req.header("Authorization");
      if (!authorization) throw CustomError.unauthorized("Not token provided");
      if (!authorization.startsWith("Bearer "))
        throw CustomError.unauthorized("Invalid bearer token");

      const token = authorization.split(" ").at(1) || "";

      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) throw CustomError.unauthorized("Invalid Token");

      const user = await UserModel.findById(payload.id);
      if (!user) throw CustomError.unauthorized("Invalid Token");

      req.body.user = user;
      next();
    } catch (error) {
      return CustomError.handleError(error, res);
    }
  };
}
