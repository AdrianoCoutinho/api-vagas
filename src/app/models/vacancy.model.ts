import { v4 as createUuid } from "uuid";
import { Recruiter } from "./recruiter.model";

export class Vacancy {
  private _id: string;

  constructor(
    public description: string,
    public nameCompany: string,
    public dtLimit: Date,
    public indActive: boolean,
    public recruiter: Recruiter,
    public maxCandidates?: number
  ) {
    this._id = createUuid();
  }

  public get id() {
    return this._id;
  }

  public static create(
    id: string,
    description: string,
    nameCompany: string,
    dtLimit: Date,
    indActive: boolean,
    recruiter: Recruiter,
    maxCandidates?: number
  ) {
    const vacancy = new Vacancy(
      description,
      nameCompany,
      dtLimit,
      indActive,
      recruiter,
      maxCandidates
    );

    vacancy._id = id;

    return vacancy;
  }
}
