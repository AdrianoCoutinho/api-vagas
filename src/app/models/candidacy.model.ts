import { v4 as createUuid } from "uuid";
import { Candidate } from "./candidate.model";
import { Vacancy } from "./vacancy.model";

export class Candidacy {
  private _id: string;

  constructor(
    public dtRegister: Date,
    public IndSuccess: boolean,
    public candidate: Candidate,
    public vacancy: Vacancy
  ) {
    this._id = createUuid();
  }

  public get id() {
    return this._id;
  }

  public static create(
    id: string,
    dtRegister: Date,
    indSuccess: boolean,
    candidate: Candidate,
    vacancy: Vacancy
  ) {
    const candidacy = new Candidacy(dtRegister, indSuccess, candidate, vacancy);
    candidacy._id = id;

    return candidacy;
  }
}
