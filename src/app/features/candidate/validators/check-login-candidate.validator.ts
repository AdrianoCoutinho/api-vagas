import { NextFunction, Request, Response } from "express";
import { Typeuser } from "../../../models/user.model";
import { ApiError } from "../../../shared/errors/api.error";

export const checkLoginCandidateValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.headers["user"] as string;

    if (!user) {
      return res.status(401).send({
        ok: false,
        message: "Usuário não está logado",
      });
    }

    const decodedUser = JSON.parse(user);

    if (decodedUser.Typeuser !== Typeuser.Candidate) {
      return res.status(403).send({
        ok: false,
        message: "Usuário não possui permissão",
      });
    }

    return next();
  } catch (error: any) {
    return ApiError.serverError(res, error);
  }
};
