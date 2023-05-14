import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Candidacy } from "../../../models/candidacy.model";
import { CandidacyEntity } from "../../../shared/database/entities/candidacy.entity";
import { UserRepository } from "../../user/database/user.repository";
import { VacancyRepository } from "../../vacancy/database/vacancy.repository";

interface CandidacyParams {
  idVaga?: string;
  idCandidato?: string;
}

export class CandidacyRepository {
  private repository =
    TypeormConnection.connection.getRepository(CandidacyEntity);
  public async listByVaga(params: CandidacyParams) {
    const result = await this.repository.find({
      where: {
        idVacancy: params.idVaga,
        idCandidate: params.idCandidato,
      },
      relations: ["candidate", "vacancy", "vacancy.recruiter"],
    });

    return result.map((item) => this.mapEntityToModel(item));
  }

  public async listAll() {
    const result = await this.repository.find({
      relations: ["candidate", "vacancy", "vacancy.recruiter"],
    });

    return result.map((item) => this.mapEntityToModel(item));
  }

  public async getById(idCandidate: string) {
    const result = await this.repository.find({
      where: {
        idCandidate,
      },
      relations: {
        candidate: true,
        vacancy: { recruiter: true },
      },
    });

    return result.map((item) => this.mapEntityToModel(item));
  }

  public mapEntityToModel(entity: CandidacyEntity): Candidacy {
    const candidate = UserRepository.mapEntityToModel(entity.candidate);
    const vacancy = VacancyRepository.mapEntityToModel(entity.vacancy);
    return Candidacy.create(
      entity.id,
      entity.dtRegister,
      entity.indSuccess,
      candidate,
      vacancy
    );
  }

  public async create(Candidacy: Candidacy) {
    const entity = this.repository.create({
      id: Candidacy.id,
      dtRegister: Candidacy.dtRegister,
      indSuccess: Candidacy.IndSuccess,
      idCandidate: Candidacy.candidate.id,
      idVacancy: Candidacy.vacancy.id,
    });

    await this.repository.save(entity);
  }
}
