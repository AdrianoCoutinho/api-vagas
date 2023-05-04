import { Router } from "express";
import { checkLoginRecruiterValidator } from "../validators/check-login-recruiter.validator";
import { CheckLoginValidator } from "../../login/validators/check-login.validator";
import { RecruiterController } from "../controllers/recruiter.controller";

export const recruiterRoutes = () => {
  const router = Router();

  router.get(
    "/",
    [CheckLoginValidator, checkLoginRecruiterValidator],
    new RecruiterController().list
  );

  router.post("/", new RecruiterController().create);

  return router;
};
