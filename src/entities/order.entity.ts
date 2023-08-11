import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Cart } from './cart.entity';
import { Payment } from './payment.entity';
import { PaymentTransaction } from './payment_transaction.entity';

export enum Status {
  PENDING = "pending",
  COMPLETED = "completed",
  DECLINED = "declined"
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string


  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  public user: User

  @ManyToOne(() => Cart, (cart) => cart.orders)
  @JoinColumn({ name: 'cart_id' })
  public cart: Cart

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[]

  @Column({ type: 'float' })
  public amount: number

  @Column({ type: "enum", enum: Status, default: Status.PENDING })
  public status: Status

  @OneToMany(() => PaymentTransaction, (transaction) => transaction.order)
  transactions: PaymentTransaction[]

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
