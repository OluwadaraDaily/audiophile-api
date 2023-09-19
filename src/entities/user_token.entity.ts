import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'user_tokens' })
export class UserToken {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public token: string

  @ManyToOne(() => User, (user) => user.tokens, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  public user: User

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  public deleted_at: Date;
}