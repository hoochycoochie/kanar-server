import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

import uuid from 'uuid/v4';
import { Name } from './name_description_embedded.entity';
import Member from './member.entity';
import Company from './company.entity';

@Entity({ name: 'salepoint' })
//@Unique(["name"])
class SalePoint extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;

  @Column(() => Name, { prefix: false })
  name: Name;

  @Column({ type: 'uuid', nullable: false })
  authorId: string;

  @Column({ type: 'uuid', nullable: false })
  companyId: string;

  @ManyToOne(() => Company, company => company.salepoints)
  company: Company;
  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}

export default SalePoint;
