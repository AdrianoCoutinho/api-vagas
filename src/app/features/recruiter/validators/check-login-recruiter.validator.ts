import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { Typeruser } from "../../../models/user.model";

export const checkLoginRecruiterValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.headers["usuario"] as string;

    if (!user) {
      return res.status(401).send({
        ok: false,
        message: "Usuário não está logado",
      });
    }

    const decodeUser = JSON.parse(user);

    if (decodeUser.type !== Typeruser.Recruiter) {
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
