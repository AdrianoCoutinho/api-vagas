import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { VacancyRepository } from "../database/vacancy.repository";

export class ListVacanciesUsecase {
  public async execute(): Promise<Return> {
    const cacheRepository = new CacheRepository();
    const cacheResult = await cacheRepository.get("listVacancies");

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message: "Vagas listadas com sucesso! - Cache",
        data: cacheResult,
      };
    }
    const repository = new VacancyRepository();
    const listVacancies = await repository.list();

    await cacheRepository.set(`listVacancies`, listVacancies);

    return {
      ok: true,
      code: 200,
      message: "Vagas listadas com sucesso.",
      data: listVacancies,
    };
  }
}
