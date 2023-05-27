import { Router } from "express";
import { CandidacyController } from "../controllers/candidacy.controller";
import { checkLoginValidator } from "../../../shared/validators/check-login.validator";
import { checkLoginCandidateValidator } from "../../candidate/validators/check-login-candidate.validator";

export const candidacyRoutes = () => {
  const router = Router();

  router.post(
    "/",
    [checkLoginValidator, checkLoginCandidateValidator],
    new CandidacyController().create
  );

  router.get(
    "/",
    [checkLoginValidator, checkLoginCandidateValidator],
    new CandidacyController().listCandidaturas
  );

  router.get("/listall", new CandidacyController().listAllCandidaturas);

  return router;
};
