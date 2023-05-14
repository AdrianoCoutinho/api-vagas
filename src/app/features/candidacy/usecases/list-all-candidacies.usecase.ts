import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { CandidacyRepository } from "../database/candidacy.database";

export class ListAllCandidaciesUsecase {
  public async execute(): Promise<Return> {
    const cacheRepository = new CacheRepository();

    const cacheResult = await cacheRepository.get("listCandidacies");

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message: "Lista de candidaturas obtidas com sucesso! - Cache",
        data: cacheResult,
      };
    }

    const candidaturaRepository = new CandidacyRepository();

    const listCandidacies = await candidaturaRepository.listAll();

    const result = await cacheRepository.set(
      `listCandidatures`,
      listCandidacies
    );

    if (!listCandidacies) {
      return {
        ok: false,
        code: 404,
        message: "Candidaturas não encontradas.",
      };
    }

    return {
      ok: true,
      code: 200,
      message: "Candidaturas listadas com sucesso!",
      data: listCandidacies,
    };
  }
}
