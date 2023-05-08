import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { ListVacanciesUsecase } from "../usecases/list-vacancies.usecase";
import { CreateVacancyUsecase } from "../usecases/create-vacancy.usecase";
import { ListVacancyUsecase } from "../usecases/list-vacancy.usecase";

export class VacancyController {
  public async listAllVagas(req: Request, res: Response) {
    try {
      const usecase = new ListVacanciesUsecase();
      const result = await usecase.execute();

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async getVaga(req: Request, res: Response) {
    try {
      const { idVaga } = req.params;
      console.log(idVaga);
      const usecase = new ListVacancyUsecase();
      const result = await usecase.execute(idVaga);

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { description, nameCompany, dtLimit, indActive, maxCandidates } =
        req.body;

      const usuario = req.headers["user"] as string;
      const usuarioDecoded = JSON.parse(usuario);

      const usecase = new CreateVacancyUsecase();
      const result = await usecase.execute({
        description,
        nameCompany,
        dtLimit,
        indActive,
        maxCandidates,
        idRecruiter: usuarioDecoded.id,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
