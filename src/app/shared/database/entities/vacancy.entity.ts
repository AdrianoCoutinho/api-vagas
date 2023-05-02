import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("vacancy")
export class VacancyEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column({
    name: "name_company",
  })
  nameCompany: string;

  @Column({
    name: "dt_limit",
  })
  dtLimit: Date;

  @Column({
    name: "ind_active",
    default: true,
  })
  indActive: boolean;

  @Column({
    name: "max_candidates",
    nullable: true,
  })
  maxCandidates?: number;

  @Column({
    name: "id_recruiter",
  })
  idRecruiter: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_recruiter",
  })
  recrutador: UserEntity;

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
