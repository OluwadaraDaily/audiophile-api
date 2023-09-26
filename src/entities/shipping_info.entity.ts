import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'shipping_infos' })
export class ShippingInfo {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public address: string;

  @Column()
  public zip_code: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  @ManyToOne(() => User, (user) => user.shipping_infos, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  public user: User;

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