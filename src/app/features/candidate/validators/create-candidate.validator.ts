import { NextFunction, Request, Response } from "express";
import { RequestError } from "../../../shared/errors/request.error";
import { ApiError } from "../../../shared/errors/api.error";

export class CreateCandidateValidator {
  public static async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, username, password } = req.body;

      if (!name) {
        return RequestError.fieldNotProvided(res, "Name");
      }

      if (!username) {
        return RequestError.fieldNotProvided(res, "Username");
      }

      if (!password) {
        return RequestError.fieldNotProvided(res, "Password");
      }
      next();
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
