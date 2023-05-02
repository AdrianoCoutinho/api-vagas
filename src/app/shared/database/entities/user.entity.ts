import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Typeruser } from "../../../models/user.model";

@Entity("user")
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 1,
    enum: ["A", "R", "C"],
  })
  type: Typeruser;

  @Column({
    nullable: true,
    name: "name_company",
  })
  nameCompany: string;

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
