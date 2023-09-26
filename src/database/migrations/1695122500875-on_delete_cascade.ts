import { MigrationInterface, QueryRunner } from "typeorm";

export class OnDeleteCascade1695122500875 implements MigrationInterface {
    name = 'OnDeleteCascade1695122500875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_products" DROP CONSTRAINT "FK_ebc4fe8eabf38786bb86cda0b9f"`);
        await queryRunner.query(`ALTER TABLE "cart_products" DROP CONSTRAINT "FK_bb7910594db3f08cadeb6f484c1"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_427785468fb7d2733f59e7d7d39"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" DROP CONSTRAINT "FK_77fab0556decc83a81a5bf8c25d"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" DROP CONSTRAINT "FK_a0141a13c98d93973a524e6dec7"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" DROP CONSTRAINT "FK_0f581511ac19ecb02dab437cd41"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "FK_9302bda9c9f29657710e0299950"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "FK_d7d7fb15569674aaadcfbc0428c"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP CONSTRAINT "FK_9e144a67be49e5bba91195ef5de"`);
        await queryRunner.query(`ALTER TABLE "billing_details" DROP CONSTRAINT "FK_3c3537a2737c2f94d5e17043965"`);
        await queryRunner.query(`ALTER TABLE "shipping_infos" DROP CONSTRAINT "FK_118e55857db187f89131bd7cfbf"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_f42b1d95404c45b10bf2451d814"`);
        await queryRunner.query(`ALTER TABLE "cart_products" ADD CONSTRAINT "FK_ebc4fe8eabf38786bb86cda0b9f" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products" ADD CONSTRAINT "FK_bb7910594db3f08cadeb6f484c1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_427785468fb7d2733f59e7d7d39" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" ADD CONSTRAINT "FK_77fab0556decc83a81a5bf8c25d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" ADD CONSTRAINT "FK_a0141a13c98d93973a524e6dec7" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" ADD CONSTRAINT "FK_0f581511ac19ecb02dab437cd41" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD CONSTRAINT "FK_9302bda9c9f29657710e0299950" FOREIGN KEY ("payment_provider_id") REFERENCES "payment_providers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD CONSTRAINT "FK_d7d7fb15569674aaadcfbc0428c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD CONSTRAINT "FK_9e144a67be49e5bba91195ef5de" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "billing_details" ADD CONSTRAINT "FK_3c3537a2737c2f94d5e17043965" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipping_infos" ADD CONSTRAINT "FK_118e55857db187f89131bd7cfbf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_f42b1d95404c45b10bf2451d814" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_f42b1d95404c45b10bf2451d814"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "shipping_infos" DROP CONSTRAINT "FK_118e55857db187f89131bd7cfbf"`);
        await queryRunner.query(`ALTER TABLE "billing_details" DROP CONSTRAINT "FK_3c3537a2737c2f94d5e17043965"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP CONSTRAINT "FK_9e144a67be49e5bba91195ef5de"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "FK_d7d7fb15569674aaadcfbc0428c"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "FK_9302bda9c9f29657710e0299950"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" DROP CONSTRAINT "FK_0f581511ac19ecb02dab437cd41"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" DROP CONSTRAINT "FK_a0141a13c98d93973a524e6dec7"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" DROP CONSTRAINT "FK_77fab0556decc83a81a5bf8c25d"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_427785468fb7d2733f59e7d7d39"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea"`);
        await queryRunner.query(`ALTER TABLE "cart_products" DROP CONSTRAINT "FK_bb7910594db3f08cadeb6f484c1"`);
        await queryRunner.query(`ALTER TABLE "cart_products" DROP CONSTRAINT "FK_ebc4fe8eabf38786bb86cda0b9f"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_f42b1d95404c45b10bf2451d814" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipping_infos" ADD CONSTRAINT "FK_118e55857db187f89131bd7cfbf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "billing_details" ADD CONSTRAINT "FK_3c3537a2737c2f94d5e17043965" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD CONSTRAINT "FK_9e144a67be49e5bba91195ef5de" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD CONSTRAINT "FK_d7d7fb15569674aaadcfbc0428c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD CONSTRAINT "FK_9302bda9c9f29657710e0299950" FOREIGN KEY ("payment_provider_id") REFERENCES "payment_providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" ADD CONSTRAINT "FK_0f581511ac19ecb02dab437cd41" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" ADD CONSTRAINT "FK_a0141a13c98d93973a524e6dec7" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" ADD CONSTRAINT "FK_77fab0556decc83a81a5bf8c25d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_427785468fb7d2733f59e7d7d39" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products" ADD CONSTRAINT "FK_bb7910594db3f08cadeb6f484c1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products" ADD CONSTRAINT "FK_ebc4fe8eabf38786bb86cda0b9f" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
