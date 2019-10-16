import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import uuid from 'uuid/v4';
import Member from './member.entity';
import Company from './company.entity';
import ProductOperation from './product_operation.entity';

@Entity({ name: 'salepoint' })
class SalePoint extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'uuid', nullable: false })
  author_id: string;

  @Column({ type: 'uuid', nullable: false })
  company_id: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Company, company => company.salepoints)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Member, Member => Member.salepoints)
  @JoinColumn({ name: 'author_id' })
  author: Member;

  // @ManyToMany(() => Product)
  // @JoinTable({
  //   name: 'product_salepoint',
  // })
  // products: Product[];
  @OneToMany(
    () => ProductOperation,
    productOperation => productOperation.salepoint
  )
  productOperations: ProductOperation[];
  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}

export default SalePoint;
