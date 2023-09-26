import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { PaymentProvider } from './payment_provider.entity';
import { User } from './user.entity';
import { PaymentTransaction } from './payment_transaction.entity';

export enum PaymentStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  DISABLED = "disabled"
}

@Entity({ name: 'payment_methods' })
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @ManyToOne(() => PaymentProvider, (paymentProvider) => paymentProvider.paymentMethods, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'payment_provider_id' })
  public provider: PaymentProvider

  @ManyToOne(() => User, (user) => user.paymentMethods, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  public user: User

  @Column()
  public type: string

  @Column({ type: 'jsonb' })
  public account_details

  @Column()
  public currency_code: string

  @Column({ type: 'boolean', default: false })
  public is_primary: boolean

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.ACTIVE })
  public status: PaymentStatus

  @Column()
  public external_id: string

  @Column({ type: 'jsonb' })
  public meta_data

  @OneToMany(() => PaymentTransaction, (transaction) => transaction.paymentMethod)
  transactions: PaymentTransaction[]

  @CreateDateColumn({
    type: 'timestamp',
    name: 'expires_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public expires_at: Date

  @CreateDateColumn({
    type: 'timestamp',
    name: 'last_used_at',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  public last_used_at: Date

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
