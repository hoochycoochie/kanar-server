import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import uuid from 'uuid/v4';
import Member from './member.entity';
import Company from './company.entity';
import ProductOperation from './product_operation.entity';
import Product from './product.entity';

@Entity({ name: 'salepoint' })
class SalePoint extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'uuid', nullable: false })
  authorId: string;

  @Column({ type: 'uuid', nullable: false })
  companyId: string;

  @ManyToOne(() => Company, company => company.salepoints)
  company: Company;

  @ManyToOne(() => Member, Member => Member.salepoints)
  author: Member;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'product_salepoint',
  })
  products: Product[];
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
