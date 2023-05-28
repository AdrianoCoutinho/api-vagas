import { MigrationInterface, QueryRunner } from "typeorm";

export class finalMigration1685237248692 implements MigrationInterface {
    name = 'finalMigration1685237248692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apiVagas"."vacancy" DROP CONSTRAINT "FK_340f74629dbfc4df4a4e265b843"`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" DROP CONSTRAINT "FK_951988966e7fd7d9b380b94491f"`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" DROP CONSTRAINT "FK_e8bd5a7e114a029d1c825fce147"`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."vacancy" ADD CONSTRAINT "FK_340f74629dbfc4df4a4e265b843" FOREIGN KEY ("id_recruiter") REFERENCES "apiVagas"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" ADD CONSTRAINT "FK_951988966e7fd7d9b380b94491f" FOREIGN KEY ("id_vacancy") REFERENCES "apiVagas"."vacancy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" ADD CONSTRAINT "FK_e8bd5a7e114a029d1c825fce147" FOREIGN KEY ("id_candidate") REFERENCES "apiVagas"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" DROP CONSTRAINT "FK_e8bd5a7e114a029d1c825fce147"`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" DROP CONSTRAINT "FK_951988966e7fd7d9b380b94491f"`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."vacancy" DROP CONSTRAINT "FK_340f74629dbfc4df4a4e265b843"`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" ADD CONSTRAINT "FK_e8bd5a7e114a029d1c825fce147" FOREIGN KEY ("id_candidate") REFERENCES "apiVagas"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."candidacy" ADD CONSTRAINT "FK_951988966e7fd7d9b380b94491f" FOREIGN KEY ("id_vacancy") REFERENCES "apiVagas"."vacancy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apiVagas"."vacancy" ADD CONSTRAINT "FK_340f74629dbfc4df4a4e265b843" FOREIGN KEY ("id_recruiter") REFERENCES "apiVagas"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
