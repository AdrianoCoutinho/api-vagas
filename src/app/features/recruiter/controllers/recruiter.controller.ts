import { ListRecruitersUsecase } from "../usecases/list-recruiters.usecase";
import { ApiError } from "../../../shared/errors/api.error";
import { Request, Response } from "express";
import { CreateRecruiterUsecase } from "../usecases/create-recruiter.usecase";

export class RecruiterController {
  public async list(req: Request, res: Response) {
    try {
      const result = await new ListRecruitersUsecase().execute();

      return res.status(200).send(result);
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, username, password, nameCompany } = req.body;

      const result = await new CreateRecruiterUsecase().execute(req.body);

      return res.status(result.code).send(result);
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }
}
