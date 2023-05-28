import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { RequestError } from "../../../shared/errors/request.error";
import { CreateAdminUsecase } from "../usecases/create-admin.usecase";
import { ListAllUsecase } from "../usecases/list-all.usecase";

export class AdminController {
  public async create(req: Request, res: Response) {
    try {
      const { name, username, password } = req.body;

      const result = await new CreateAdminUsecase().execute(req.body);

      return res.status(result.code).send(result);
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }

  public async listall(req: Request, res: Response) {
    try {
      const result = await new ListAllUsecase().execute();

      return res.status(result.code).send(result);
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }
}
