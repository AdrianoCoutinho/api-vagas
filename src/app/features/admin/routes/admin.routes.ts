import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { CreateAdminValidator } from "../validators/create-admin.validator";
import { checkAdminValidator } from "../../../shared/validators/check-admin-validator";

export const adminRoutes = () => {
  const router = Router();

  router.post(
    "/",
    [CreateAdminValidator.validate],
    new AdminController().create
  );

  router.get("/", [checkAdminValidator], new AdminController().listall);

  return router;
};
