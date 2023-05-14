import { Router } from "express";
import { checkRecruiterValidator } from "../validators/check-recruiter.validator";
import { checkLoginValidator } from "../../login/validators/check-login.validator";
import { RecruiterController } from "../controllers/recruiter.controller";
import { CreateRecruiterValidator } from "../validators/create-recruiter.validator";
import { VacancyController } from "../../vacancy/controllers/vacancy.controller";

export const recruiterRoutes = () => {
  const router = Router();

  router.get(
    "/vacancies",
    [checkLoginValidator, checkRecruiterValidator],
    new VacancyController().listAllVacanciesByRecruiter
  );

  router.get(
    "/:idVacancy",
    [checkLoginValidator, checkRecruiterValidator],
    new VacancyController().getVagaByRecruiter
  );

  router.get(
    "/",
    [checkLoginValidator, checkRecruiterValidator],
    new RecruiterController().list
  );

  router.post(
    "/",
    [CreateRecruiterValidator.validate],
    new RecruiterController().create
  );

  return router;
};
