import cors from "cors";
import express from "express";
import { recruiterRoutes } from "../../app/features/recruiter/routes/recruiter.routes";
import { candidateRoutes } from "../../app/features/candidate/routes/candidate.routes";
import { loginRoutes } from "../../app/features/login/routes/login.routes";
import { vacancyRoutes } from "../../app/features/vacancy/routes/vacancy.routes";
import { candidacyRoutes } from "../../app/features/candidacy/routes/candidacy.routes";
import { adminRoutes } from "../../app/features/admin/routes/admin.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/admin", adminRoutes());

  app.use("/recruiter", recruiterRoutes());

  app.use("/auth", loginRoutes());

  app.use("/candidate", candidateRoutes());

  app.use("/vacancy", vacancyRoutes());

  app.use("/candidacy", candidacyRoutes());

  return app;
};
