import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { Typeuser } from "../../../models/user.model";

export const checkAdminValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usuario = req.headers["user"] as string;

    if (!usuario) {
      return res.status(401).send({
        ok: false,
        message: "Usuario não logado",
      });
    }

    const decodedUsuario = JSON.parse(usuario);
    if (decodedUsuario.Typeuser !== Typeuser.Admin) {
      return res.status(403).send({
        ok: false,
        message: "Usuario não possui permissão",
      });
    }
    return next();
  } catch (error: any) {
    return ApiError.serverError(res, error);
  }
};
