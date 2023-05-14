import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { CandidacyRepository } from "../database/candidacy.database";

export class ListCandidaciesUsecase {
  public async execute(idCandidate: string): Promise<Return> {
    const cacheRepository = new CacheRepository();

    const cacheResult = await cacheRepository.get(
      `listaCandidatura:${idCandidate}`
    );

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message: "Candidaturas obtidas com sucesso! - Cache",
        data: cacheResult,
      };
    }

    const repository = new CandidacyRepository();
    const listaCandidaturas = await repository.getById(idCandidate);

    await cacheRepository.set(
      `listCandidature:${idCandidate}`,
      listaCandidaturas
    );

    if (!listaCandidaturas) {
      return {
        ok: false,
        code: 404,
        message: "Candidaturas não encontradas",
      };
    }
    return {
      ok: true,
      code: 200,
      message: "Candidaturas obtidas com sucesso!",
      data: listaCandidaturas,
    };
  }
}
