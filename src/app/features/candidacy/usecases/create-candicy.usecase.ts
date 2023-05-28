import { Candidacy } from "../../../models/candidacy.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";
import { VacancyRepository } from "../../vacancy/database/vacancy.repository";
import { CandidacyRepository } from "../database/candidacy.database";
import { ApplicationValidator } from "../validators/application.validator";
interface ApplicationParams {
  idCandidato: string;
  idVaga: string;
}

export class CreateUsecase {
  public async execute(data: ApplicationParams): Promise<Return> {
    const usuarioRepository = new UserRepository();
    const candidato = await usuarioRepository.get(data.idCandidato);

    if (!candidato) {
      return {
        ok: false,
        code: 404,
        message: "Candidato não encontrado",
      };
    }

    const vagasRepository = new VacancyRepository();
    const vaga = await vagasRepository.get(data.idVaga);

    if (!vaga) {
      return {
        ok: false,
        code: 404,
        message: "Vaga não encontrada",
      };
    }

    const result = ApplicationValidator.validateVacancy(vaga);

    if (!result.ok) {
      return result;
    }

    const repository = new CandidacyRepository();

    const candidates = await repository.listByVaga({ idVaga: vaga.id });

    if (vaga.maxCandidates) {
      if (candidates.length >= vaga.maxCandidates) {
        return {
          ok: false,
          code: 400,
          message: "Já alcançou o limite de candidaturas.",
        };
      }
    }

    if (ApplicationValidator.doubleCandidacy(candidates, data.idCandidato)) {
      return {
        ok: false,
        code: 400,
        message: "Você já se candidatou à esta vaga.",
      };
    }

    const newCandidatura = new Candidacy(new Date(), false, candidato, vaga);

    await repository.create(newCandidatura);

    await new CacheRepository().delete(`listCandidature:${data.idCandidato}`);
    await new CacheRepository().delete(`listCandidatures`);

    return {
      ok: true,
      code: 201,
      message: "Você se candidatou a vaga com sucesso",
    };
  }
}
