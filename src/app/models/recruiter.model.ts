import { Typeuser, User } from "./user.model";

export class Recruiter extends User {
  constructor(
    name: string,
    username: string,
    password: string,
    nameCompany: string
  ) {
    super(name, username, password, Typeuser.Recruiter, nameCompany);
  }
}
