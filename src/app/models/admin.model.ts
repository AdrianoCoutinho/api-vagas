import { Typeuser, User } from "./user.model";

export class Admin extends User {
  constructor(name: string, username: string, password: string) {
    super(name, username, password, Typeuser.Admin);
  }
}
