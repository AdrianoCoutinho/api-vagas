import { Candidate } from "../../../models/candidate.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";

interface CreateCandidateParams {
  name: string;
  username: string;
  password: string;
}

export class CreateCandidateUsecase {
  public async execute(data: CreateCandidateParams): Promise<Return> {
    const repository = new UserRepository();
    const user = await repository.getByUsername(data.username);

    if (user !== null) {
      return {
        ok: false,
        code: 400,
        message: "Candidato já existe",
      };
    }

    const candidate = new Candidate(data.name, data.username, data.password);

    const result = await repository.create(candidate);

    await new CacheRepository().delete(`listaCandidatos`);

    return {
      ok: true,
      code: 201,
      message: "Candidato criado com sucesso!",
      data: result,
    };
  }
}
