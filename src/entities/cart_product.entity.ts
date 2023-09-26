import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity({ name: "cart_products" })
export class CartProduct {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @ManyToOne(() => Cart, (cart) => cart.products, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'cart_id' })
  public cart: Cart

  @ManyToOne(() => Product, (product) => product.cart_products, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'product_id' })
  public product: Product

  @Column({ type: "int" })
  public quantity: number

  @Column({ type: "float" })
  public sub_total: number

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  public created_at: Date

  @CreateDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  public deleted_at: Date
}
