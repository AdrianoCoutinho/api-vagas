import { Recruiter } from "../../../models/recruiter.model";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";

interface CreateRecruiterParams {
  name: string;
  username: string;
  passowrd: string;
  nameCompany: string;
}

export class CreateRecruiterUsecase {
  public async execute(data: CreateRecruiterParams): Promise<Return> {
    const repository = new UserRepository();

    const user = await repository.getByUsername(data.username);

    if (user !== null) {
      return {
        ok: false,
        code: 400,
        message: "Usuário já existe",
      };
    }

    const recruiter = new Recruiter(
      data.name,
      data.username,
      data.passowrd,
      data.nameCompany
    );

    const result = await repository.create(recruiter);

    return {
      ok: true,
      code: 201,
      message: "Usuário criado com sucesso",
      data: result,
    };
  }
}
