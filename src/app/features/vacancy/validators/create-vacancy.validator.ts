import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { RequestError } from "../../../shared/errors/request.error";

export class CreateVacancyValidator {
  public static async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { description, nameCompany, dtLimit, indActive, maxCandidates } =
        req.body;

      if (!dtLimit) {
        return RequestError.fieldNotProvided(res, "dtLimit");
      }

      if (dtLimit) {
        var patternData = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
        if (!patternData.test(dtLimit)) {
          return res.status(400).send({
            ok: false,
            message: "formato de data invalido, utlize ano-mes-dia!",
          });
        }
        let date = new Date(dtLimit.split("-").reverse().join("-"));
        const novaData = new Date();
        if (date <= novaData) {
          return res.status(400).send({
            ok: false,
            message: "Digite uma data posterior a data atual!",
          });
        }
      }

      if (!description) {
        return RequestError.fieldNotProvided(res, "description");
      }

      if (!nameCompany) {
        return RequestError.fieldNotProvided(res, "nameCompany");
      }

      if (indActive === undefined) {
        return RequestError.fieldNotProvided(res, "indActive");
      }

      if (maxCandidates <= 0) {
        return res.status(400).send({
          ok: false,
          message: "Digite um limite de vagas maior que zero!",
        });
      }

      next();
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
