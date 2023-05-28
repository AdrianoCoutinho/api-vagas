import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";

export const adminRoutes = () => {
  const router = Router();

  router.post("/", new AdminController().create);

  router.get("/", new AdminController().listall);

  return router;
};
