import cors from "cors";
import express from "express";
import { recruiterRoutes } from "../../app/features/recruiter/routes/recruiter.routes";
import { candidateRoutes } from "../../app/features/candidate/routes/candidate.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/recruiter", recruiterRoutes());
  app.use("/candidate", candidateRoutes());

  return app;
};
