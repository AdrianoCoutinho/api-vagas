import { Typeuser, User } from "./user.model";

export class Candidate extends User {
  constructor(name: string, username: string, password: string) {
    super(name, username, password, Typeuser.Candidate);
  }
}
