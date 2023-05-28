import { Typeuser } from "../../../models/user.model";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";

export class ListAllUsecase {
  public async execute(): Promise<Return> {
    const repository = new UserRepository();
    const result = await repository.list();

    return {
      ok: true,
      data: result,
      code: 200,
      message: "Todos usuários listados com sucesso",
    };
  }
}
