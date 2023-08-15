import { MigrationInterface, QueryRunner } from "typeorm";

export class BillingDetailsAndShippingInfo1692040428237 implements MigrationInterface {
    name = 'BillingDetailsAndShippingInfo1692040428237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "billing_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_3c3537a2737c2f94d5e1704396" UNIQUE ("user_id"), CONSTRAINT "PK_738ee1c4645561398f831533525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping_infos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "zip_code" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_e2a84d7d98dd77f66e352cdbe44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "is_active" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "billing_details" ADD CONSTRAINT "FK_3c3537a2737c2f94d5e17043965" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipping_infos" ADD CONSTRAINT "FK_118e55857db187f89131bd7cfbf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_infos" DROP CONSTRAINT "FK_118e55857db187f89131bd7cfbf"`);
        await queryRunner.query(`ALTER TABLE "billing_details" DROP CONSTRAINT "FK_3c3537a2737c2f94d5e17043965"`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "is_active" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "shipping_infos"`);
        await queryRunner.query(`DROP TABLE "billing_details"`);
    }

}
