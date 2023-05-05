import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Vacancy } from "../../../models/vacancy.model";
import { VacancyEntity } from "../../../shared/database/entities/vacancy.entity";
import { UserRepository } from "../../user/database/user.repository";

export class VacancyRepository {
  private repository =
    TypeormConnection.connection.getRepository(VacancyEntity);

  public async create(vacancy: Vacancy) {
    const vagaEntity = this.repository.create({
      id: vacancy.id,
      description: vacancy.description,
      nameCompany: vacancy.nameCompany,
      dtLimit: vacancy.dtLimit,
      idRecruiter: vacancy.recruiter.id,
      indActive: vacancy.indActive,
      maxCandidates: vacancy.maxCandidates,
    });

    await this.repository.save(vagaEntity);
  }

  public async list() {
    const result = await this.repository.find({
      relations: ["recruiter"],
    });

    return result.map((item) => VacancyRepository.mapEntityToModel(item));
  }

  public async get(id: string) {
    const result = await this.repository.findOne({
      where: {
        id,
      },
      relations: ["recruiter"],
    });

    if (result === null) {
      return null;
    }

    return VacancyRepository.mapEntityToModel(result);
  }

  public static mapEntityToModel(entity: VacancyEntity): Vacancy {
    const recruiter = UserRepository.mapEntityToModel(entity.recruiter);

    const vaga = Vacancy.create(
      entity.id,
      entity.description,
      entity.nameCompany,
      entity.dtLimit,
      entity.indActive,
      recruiter,
      entity.maxCandidates
    );

    return vaga;
  }
}
