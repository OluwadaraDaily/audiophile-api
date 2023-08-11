import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Cart } from './cart.entity';
import { CartProduct } from './cart_product.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column({ type: "text" })
  public description: string

  @Column({ type: "float" })
  public unit_price: number

  @Column({ type: "int" })
  public quantity: number

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  public category: Category

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cart_products: CartProduct[]

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
