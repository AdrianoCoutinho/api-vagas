import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { RequestError } from "../../../shared/errors/request.error";
import { UserRepository } from "../../user/database/user.repository";
import { Typeuser } from "../../../models/user.model";

export class CreateAdminValidator {
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

      const repository = new UserRepository();
      const usuario = await repository.getByUsername(username);

      if (usuario !== null) {
        return RequestError.invalidData(res, "Username já existe!");
      }

      next();
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
