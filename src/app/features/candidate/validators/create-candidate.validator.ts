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
        RequestError.fieldNotProvided(res, "Name");
      }

      if (!username) {
        RequestError.fieldNotProvided(res, "Username");
      }

      if (!password) {
        RequestError.fieldNotProvided(res, "Password");
      }
      next();
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }
}
