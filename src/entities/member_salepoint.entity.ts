import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Member from './member.entity';
import SalePoint from './sale_point.entity';

@Entity({ name: 'member_salepoint' })
class MemberSalePoint extends BaseEntity {
  @PrimaryColumn('uuid')
  member_id: string;

  @PrimaryColumn('uuid')
  salepoint_id: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;
  @Column()
  @CreateDateColumn()
  created_at: Date;
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
  @Column({ type: 'uuid', nullable: true, unique: false })
  company_id: string;

  @OneToOne(() => Member)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @OneToOne(() => SalePoint)
  @JoinColumn({ name: 'salepoint_id' })
  salepoint: SalePoint;
}

export default MemberSalePoint;
