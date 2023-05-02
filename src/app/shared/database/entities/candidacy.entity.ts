import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { VacancyEntity } from "./vacancy.entity";
import { UserEntity } from "./user.entity";

@Entity("candidacy")
export class CandidacyEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({
    name: "dt_register",
  })
  dtRegister: Date;

  @Column({
    name: "ind_success",
    default: false,
  })
  indSuccess: boolean;

  @Column({
    name: "id_candidate",
  })
  idCandidate: string;

  @Column({
    name: "id_vacancy",
  })
  idVacancy: string;

  @ManyToOne(() => VacancyEntity)
  @JoinColumn({
    name: "id_vacancy",
  })
  vacancy: VacancyEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_candidate",
  })
  candidate: UserEntity;
}
