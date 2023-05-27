import { Vacancy } from "../../../models/vacancy.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { VacancyRepository } from "../database/vacancy.repository";

export class DeleteVacancyUsecase {
  public async execute(idVacancy: string): Promise<Return> {
    const repository = new VacancyRepository();

    const vacancyExists = await repository.get(idVacancy);

    if (!vacancyExists) {
      return {
        ok: false,
        code: 404,
        message: "Vaga não encontrada",
        data: null,
      };
    }

    const listVacancy = await repository.deleteVacancy(idVacancy);

    return {
      ok: true,
      code: 200,
      message: "Vaga deletada com sucesso!",
      data: listVacancy,
    };
  }
}
