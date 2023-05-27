import { MigrationInterface, QueryRunner } from "typeorm";

export class finalMigration1685229227321 implements MigrationInterface {
    name = 'finalMigration1685229227321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "apiVagas"."user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "type" character varying(1) NOT NULL, "name_company" character varying, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "apiVagas"."vacancy" ("id" character varying NOT NULL, "description" character varying NOT NULL, "name_company" character varying NOT NULL, "dt_limit" TIMESTAMP NOT NULL, "ind_active" boolean NOT NULL DEFAULT true, "max_candidates" integer, "id_recruiter" character varying NOT NULL, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8fa1981f63bc24e1712707d492b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "apiVagas"."candidacy" ("id" character varying NOT NULL, "dt_register" TIMESTAMP NOT NULL DEFAULT now(), "ind_success" boolean NOT NULL DEFAULT false, "id_candidate" character varying NOT NULL, "id_vacancy" character varying NOT NULL, CONSTRAINT "PK_3493e25a1777da762e42be50d18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."vacancy" ADD CONSTRAINT "FK_340f74629dbfc4df4a4e265b843" FOREIGN KEY ("id_recruiter") REFERENCES "apiVagas"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" ADD CONSTRAINT "FK_951988966e7fd7d9b380b94491f" FOREIGN KEY ("id_vacancy") REFERENCES "apiVagas"."vacancy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" ADD CONSTRAINT "FK_e8bd5a7e114a029d1c825fce147" FOREIGN KEY ("id_candidate") REFERENCES "apiVagas"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" DROP CONSTRAINT "FK_e8bd5a7e114a029d1c825fce147"`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" DROP CONSTRAINT "FK_951988966e7fd7d9b380b94491f"`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."vacancy" DROP CONSTRAINT "FK_340f74629dbfc4df4a4e265b843"`);
        await queryRunner.query(`DROP TABLE "apiVagas"."candidacy"`);
        await queryRunner.query(`DROP TABLE "apiVagas"."vacancy"`);
        await queryRunner.query(`DROP TABLE "apiVagas"."user"`);
    }

}
