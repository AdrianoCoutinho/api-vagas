import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { RequestError } from "../../../shared/errors/request.error";
import { UserRepository } from "../../user/database/user.repository";

export class CreateRecruiterValidator {
  public static async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, username, password, nameCompany } = req.body;

      if (!name) {
        RequestError.fieldNotProvided(res, "Name");
      }

      if (!username) {
        RequestError.fieldNotProvided(res, "Username");
      }

      if (!password) {
        RequestError.fieldNotProvided(res, "Password");
      }

      if (!nameCompany) {
        RequestError.fieldNotProvided(res, "Company name");
      }

      const repository = new UserRepository();
      const usuario = await repository.create(username);

      if (usuario !== null) {
        RequestError.invalidData(res, "Username já existe!");
      }

      next();
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }
}
