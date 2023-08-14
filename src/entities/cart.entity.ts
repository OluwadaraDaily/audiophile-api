import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { CartProduct } from './cart_product.entity';
import { Order } from './order.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: 'user_id' })
  public user: User

  @Column({ type: 'boolean', default: true })
  public is_active: boolean

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  products: CartProduct[]

  @OneToMany(() => Order, (order) => order.cart)
  orders: Order[]

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
    nullable: true
  })
  public deleted_at: Date
}
