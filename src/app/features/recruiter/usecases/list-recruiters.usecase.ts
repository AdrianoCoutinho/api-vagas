import { Typeruser } from "../../../models/user.model";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";

export class ListRecruitersUsecase {
  public async execute(): Promise<Return> {
    const repository = new UserRepository();
    const result = await repository.list(Typeruser.Recruiter);

    return {
      ok: true,
      data: result,
      code: 200,
      message: "Recrutadores listados com sucesso",
    };
  }
}
