import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeDeletedAtNullable1691513704154 implements MigrationInterface {
    name = 'MakeDeletedAtNullable1691513704154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_providers" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_products" ALTER COLUMN "deleted_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_products" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_providers" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "deleted_at" SET NOT NULL`);
    }

}
