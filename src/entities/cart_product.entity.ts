import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity({ name: "cart_products" })
export class CartProduct {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @ManyToOne(() => Cart, (cart) => cart.products)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart

  @ManyToOne(() => Product, (product) => product.cart_products)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column({ type: "int" })
  public quantity: number

  @Column({ type: "float" })
  public sub_total: number

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date

  @CreateDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public deleted_at: Date
}