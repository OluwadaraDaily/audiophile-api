import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { PaymentMethod } from './payment_method.entity';
import { Order } from './order.entity';

enum Status {
  PENDING = "pending",
  COMPLETED = "completed",
  DECLINED = "declined"
}

@Entity({ name: 'payment_transactions' })
export class PaymentTransaction {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.transactions)
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethod

  @ManyToOne(() => Order, (order) => order.transactions)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @Column({ type: 'float' })
  public amount: number

  @Column()
  public currency_code: string

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  public status: Status

  @Column()
  public transaction_reference: string

  @Column({ type: 'int' })
  public retries: number

  @Column({ type: 'text' })
  public notes: string

  @Column({ type: 'jsonb' })
  public meta_data

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