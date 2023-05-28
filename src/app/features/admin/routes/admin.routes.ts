import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { CreateAdminValidator } from "../validators/create-admin.validator";

export const adminRoutes = () => {
  const router = Router();

  router.post(
    "/",
    [CreateAdminValidator.validate],
    new AdminController().create
  );

  router.get("/", new AdminController().listall);

  return router;
};
