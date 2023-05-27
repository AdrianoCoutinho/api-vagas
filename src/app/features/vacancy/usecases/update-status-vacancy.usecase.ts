import { Vacancy } from "../../../models/vacancy.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { VacancyRepository } from "../database/vacancy.repository";

export class UpdateStatusVacancyUsecase {
  public async execute(idVacancy: string): Promise<Return> {
    const repository = new VacancyRepository();

    const listVacancy = await repository.changeStatus(idVacancy);

    return {
      ok: true,
      code: 200,
      message: "Vaga obtida com sucesso!",
      data: listVacancy,
    };
  }
}
