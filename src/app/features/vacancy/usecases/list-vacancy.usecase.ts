import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { VacancyRepository } from "../database/vacancy.repository";

export class ListVacancyUsecase {
  public async execute(idVacancy: string): Promise<Return> {
    const cacheRepository = new CacheRepository();

    const cacheResult = await cacheRepository.get(`listVacancy:${idVacancy}`);

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message: "Vaga obtida com sucesso! - Cache",
        data: cacheResult,
      };
    }

    const repository = new VacancyRepository();
    const listVacancy = await repository.get(idVacancy);

    await cacheRepository.set(`listVacancy:${idVacancy}`, listVacancy);

    if (!listVacancy) {
      return {
        ok: false,
        code: 404,
        message: "Vaga não encontrada",
      };
    }
    return {
      ok: true,
      code: 200,
      message: "Vaga obtida com sucesso!",
      data: listVacancy,
    };
  }
}
