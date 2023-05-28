import { Admin } from "../../../models/admin.model";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";

interface CreateAdminParams {
  name: string;
  username: string;
  password: string;
  nameCompany: string;
}

export class CreateAdminUsecase {
  public async execute(data: CreateAdminParams): Promise<Return> {
    const repository = new UserRepository();

    const user = await repository.getByUsername(data.username);

    if (user !== null) {
      return {
        ok: false,
        code: 400,
        message: "Usuário já existe",
      };
    }

    const admin = new Admin(data.name, data.username, data.password);

    const result = await repository.create(admin);

    return {
      ok: true,
      code: 201,
      message: "Usuário criado com sucesso",
      data: result,
    };
  }
}
