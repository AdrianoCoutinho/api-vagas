import { Typeuser } from "../../../models/user.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";

export class ListCandidateUsecase {
  public async execute(): Promise<Return> {
    const cacheRepository = new CacheRepository();
    const cacheResult = await cacheRepository.get("listaCandidatos");

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message: "Candidatos listados com sucesso! - Cache",
        data: cacheResult,
      };
    }

    const repository = new UserRepository();

    const listCandidates = await repository.list(Typeuser.Candidate);

    const result = await cacheRepository.set(`listaCandidatos`, listCandidates);

    return {
      ok: true,
      code: 200,
      message: "Candidatos listados com sucesso",
      data: listCandidates,
    };
  }
}
