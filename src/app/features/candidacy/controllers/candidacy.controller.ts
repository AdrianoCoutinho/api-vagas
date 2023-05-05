import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { ApplicationUsecase } from "../usecases/application.usecase";
import { ListCandidaciesUsecase } from "../usecases/list-candidacies.usecase";
import { ListAllCandidaciesUsecase } from "../usecases/list-all-candidacies.usecase";

export class CandidaturaController {
  public async create(req: Request, res: Response) {
    try {
      const { idVaga } = req.body;

      const candidato = req.headers["user"] as string;
      const candidatoDecoded = JSON.parse(candidato);

      const result = await new ApplicationUsecase().execute({
        idVaga,
        idCandidato: candidatoDecoded._id,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }

  public async listCandidaturas(req: Request, res: Response) {
    try {
      const candidato = req.headers["user"] as string;
      const candidatoDecoded = JSON.parse(candidato);

      const result = await new ListCandidaciesUsecase().execute(
        candidatoDecoded._id
      );

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async listAllCandidaturas(req: Request, res: Response) {
    try {
      const result = await new ListAllCandidaciesUsecase().execute();

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
