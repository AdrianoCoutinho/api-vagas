import { Router } from "express";
import { VacancyController } from "../controllers/vacancy.controller";
import { checkLoginValidator } from "../../login/validators/check-login.validator";
import { CreateVacancyValidator } from "../validators/create-vacancy.validator";
export const vacancyRoutes = () => {
  const router = Router();

  router.get("/", new VacancyController().listAllVagas);
  router.get("/:idVacancy", new VacancyController().getVaga);
  router.post(
    "/",
    [checkLoginValidator, CreateVacancyValidator.validate],
    new VacancyController().create
  );

  return router;
};
