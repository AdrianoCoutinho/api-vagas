import cors from "cors";
import express from "express";
import { recruiterRoutes } from "../../app/features/recruiter/routes/recruiter.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/recruiter", recruiterRoutes());

  return app;
};
