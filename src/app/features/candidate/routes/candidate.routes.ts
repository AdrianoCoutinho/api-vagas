import { Router } from "express";
import { CandidateController } from "../controllers/candidate.controller";
import { CreateCandidateValidator } from "../validators/create-candidate.validator";

export const candidateRoutes = () => {
  const router = Router();

  router.post(
    "/",
    [CreateCandidateValidator.validate],
    new CandidateController().create
  );
  router.get("/", new CandidateController().list);

  return router;
};
