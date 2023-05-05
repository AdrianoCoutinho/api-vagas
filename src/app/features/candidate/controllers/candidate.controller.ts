import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { CreateCandidateUsecase } from "../usecases/create.candidate.usecase";
import { ListCandidateUsecase } from "../usecases/list.candidates.usecase";

export class CandidateController {
  public async create(req: Request, res: Response) {
    try {
      const { name, username, password } = req.body;

      const result = await new CreateCandidateUsecase().execute(req.body);

      return res.status(result.code).send(result);
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const result = await new ListCandidateUsecase().execute();

      return res.status(result.code).send(result);
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }
}
