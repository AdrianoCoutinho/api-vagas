import { type } from "os";
import { Vacancy } from "../../../models/vacancy.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";
import { VacancyRepository } from "../database/vacancy.repository";

interface CreateVacancyParams {
  description: string;
  nameCompany: string;
  dtLimit: Date;
  idRecruiter: string;
  maxCandidates?: number;
  indActive?: boolean;
}

export class CreateVacancyUsecase {
  public async execute(data: CreateVacancyParams): Promise<Return> {
    if (data.dtLimit < new Date()) {
      return {
        ok: false,
        code: 400,
        message: "A data deve ser superior a data atual.",
      };
    }

    if (data.indActive === undefined) {
      data.indActive = true;
    }

    const userRepository = new UserRepository();
    const recruiter = await userRepository.get(data.idRecruiter);

    if (!recruiter) {
      return {
        ok: false,
        code: 404,
        message: "Recrutador não encontrado.",
      };
    }

    const vacancy = new Vacancy(
      data.description,
      data.nameCompany,
      data.dtLimit,
      data.indActive,
      recruiter,
      data.maxCandidates
    );

    const repository = new VacancyRepository();
    await repository.create(vacancy);

    await new CacheRepository().delete(`listVacancies`);
    await new CacheRepository().delete(`listVacancies:${vacancy.id}`);

    return {
      ok: true,
      code: 201,
      message: "A vaga foi criada com sucesso.",
      data: vacancy,
    };
  }
}
