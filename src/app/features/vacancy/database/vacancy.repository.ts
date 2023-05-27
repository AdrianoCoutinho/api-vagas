import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Vacancy } from "../../../models/vacancy.model";
import { VacancyEntity } from "../../../shared/database/entities/vacancy.entity";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
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

  public async changeStatus(id: string) {
    const vacancy = await this.repository.findOne({
      where: {
        id,
      },
      relations: ["recruiter"],
    });

    if (vacancy === null) {
      return {
        ok: false,
        code: 404,
        message: "Vaga não encontrada",
        data: null,
      };
    }

    if (vacancy.dtLimit < new Date()) {
      return {
        ok: false,
        code: 400,
        message:
          "Você não pode ativar uma vaga com limite de inscrição excedido",
        data: null,
      };
    }

    if (vacancy.indActive.toString() === "false") {
      vacancy.indActive = true;
      await new CacheRepository().delete(`listVacancies`);
      await new CacheRepository().delete(`listVacancies:${vacancy.id}`);

      await this.repository.save(vacancy);

      return vacancy.indActive;
    }

    if (vacancy.indActive.toString() === "true") {
      vacancy.indActive = false;
    }

    await new CacheRepository().delete(`listVacancies`);
    await new CacheRepository().delete(`listVacancies:${vacancy.id}`);

    await this.repository.save(vacancy);

    return vacancy.indActive;
  }

  public async deleteVacancy(id: string) {
    const vacancy = await this.repository.findOne({
      where: {
        id,
      },
      relations: ["recruiter"],
    });

    if (vacancy === null) {
      return null;
    }

    await new CacheRepository().delete(`listVacancies`);
    await new CacheRepository().delete(`listVacancies:${vacancy.id}`);

    await this.repository.remove(vacancy);

    return vacancy;
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
