import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { PaymentMethod } from './payment_method.entity';

@Entity({ name: 'payment_providers' })
export class PaymentProvider {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public slug: string

  @Column()
  public type: string

  @Column({ type: 'boolean' })
  public is_enabled: boolean

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.provider)
  paymentMethods: PaymentMethod[]

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