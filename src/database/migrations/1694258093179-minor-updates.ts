import { MigrationInterface, QueryRunner } from "typeorm";

export class MinorUpdates1694258093179 implements MigrationInterface {
    name = 'MinorUpdates1694258093179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_methods" ALTER COLUMN "is_primary" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ALTER COLUMN "last_used_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_methods" ALTER COLUMN "last_used_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ALTER COLUMN "is_primary" DROP DEFAULT`);
    }

}
