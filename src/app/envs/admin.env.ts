import * as dotenv from "dotenv";
dotenv.config();

export const adminEnv = {
  secret: process.env.ADMIN_SECRET,
};
