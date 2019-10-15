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

import Role from './role.entity';
import Member from './member.entity';
import Company from './company.entity';

@Entity({ name: 'member_role' })
class MemberRole extends BaseEntity {
  @PrimaryColumn('uuid')
  member_id: string;

  @PrimaryColumn('uuid')
  role_id: string;

  @Column({ type: 'uuid', nullable: true, unique: false })
  company_id: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
  @OneToOne(() => Member)
  @JoinColumn({ name: 'member_id' })
  member: Member;
  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  // @OneToOne(() => Company)
  // @JoinColumn()
  // company: Company;
}

export default MemberRole;
