import { v4 as createUuid } from "uuid";

export enum Typeuser {
  Admin = "A",
  Candidate = "C",
  Recruiter = "R",
}

export class User {
  private _id: string;

  constructor(
    public name: string,
    public username: string,
    public password: string,
    public typeUser: Typeuser,
    public nameCompany?: string
  ) {
    this._id = createUuid();
  }

  public static create(
    id: string,
    name: string,
    username: string,
    password: string,
    typeUser: Typeuser,
    nameCompany: string
  ) {
    const user = new User(name, username, password, typeUser, nameCompany);
    user._id = id;
    return user;
  }

  public get id() {
    return this._id;
  }

  public toJson() {
    return {
      _id: this._id,
      name: this.name,
      username: this.username,
      Typeuser: this.typeUser,
    };
  }
}
