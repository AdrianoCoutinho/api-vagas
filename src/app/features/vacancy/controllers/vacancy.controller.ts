import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { ListVacanciesUsecase } from "../usecases/list-vacancies.usecase";
import { CreateVacancyUsecase } from "../usecases/create-vacancy.usecase";
import { ListVacancyUsecase } from "../usecases/list-vacancy.usecase";
import { UpdateStatusVacancyUsecase } from "../usecases/update-status-vacancy.usecase";

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

  public async listAllVacanciesByRecruiter(req: Request, res: Response) {
    try {
      const usecase = new ListVacanciesUsecase();
      const result = await usecase.execute();

      const usuario = req.headers["user"] as string;

      const decodedUsuario = JSON.parse(usuario);

      const filtredResult = result.data.filter(
        (item: any) => item.recruiter.username === decodedUsuario.username
      );

      return res.status(result.code).send(filtredResult);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async getVagaByRecruiter(req: Request, res: Response) {
    try {
      const { idVaga } = req.params;
      const usecase = new ListVacancyUsecase();
      const result = await usecase.execute(idVaga);

      const usuario = req.headers["user"] as string;

      const decodedUsuario = JSON.parse(usuario);

      if (decodedUsuario.username !== result.data.recruiter.username) {
        return res.status(403).send({
          ok: false,
          message: "Usuario não possui permissão",
        });
      }

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async getVaga(req: Request, res: Response) {
    try {
      const { idVaga } = req.params;
      const usecase = new ListVacancyUsecase();
      const result = await usecase.execute(idVaga);

      const usuario = req.headers["user"] as string;

      const decodedUsuario = JSON.parse(usuario);

      if (decodedUsuario.username !== result.data.recruiter.username) {
        return res.status(403).send({
          ok: false,
          message: "Usuario não possui permissão",
        });
      }

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async changeStatus(req: Request, res: Response) {
    try {
      const { idVacancy } = req.params;
      const usecase = new UpdateStatusVacancyUsecase();

      const result = await usecase.execute(idVacancy);

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
        idRecruiter: usuarioDecoded._id,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
