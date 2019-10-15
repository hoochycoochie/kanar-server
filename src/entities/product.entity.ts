import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import uuid from 'uuid/v4';
import Category from './category.entity';
import Member from './member.entity';
import Company from './company.entity';
import ProductOperation from './product_operation.entity';
import SalePoint from './sale_point.entity';

@Entity({ name: 'product' })
class Product extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: false, unique: true })
  reference: number;
  @Column()
  is_active: boolean;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @Column({ type: 'varchar', nullable: true })
  picture_public_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid', nullable: true })
  category_id: string;

  @Column('uuid')
  author_id: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Company, company => company.products)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Product, product => product.productoperations)
  productoperations: ProductOperation[];

  @ManyToOne(() => Member, member => member.products)
  @JoinColumn({ name: 'author_id' })
  author: Member;

  @ManyToMany(() => SalePoint)
  @JoinTable({
    name: 'product_salepoint',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'salepoint_id',
      referencedColumnName: 'id',
    },
  })
  salepoints: SalePoint[];
  @BeforeInsert()
  addId() {
    this.id = uuid();
    this.reference = Math.floor(Math.random() * (5000 - 1000) + 10000);
  }
}

export default Product;
