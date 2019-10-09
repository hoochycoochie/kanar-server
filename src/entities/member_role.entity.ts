import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Column,
  BaseEntity,
} from 'typeorm';

import Role from './role.entity';
import Member from './member.entity';

@Entity({ name: 'member_role' })
class MemberRole extends BaseEntity {
  @PrimaryColumn('uuid')
  memberId: string;

  @PrimaryColumn('uuid')
  roleId: string;

  @OneToOne(() => Member)
  @JoinColumn()
  member: Member;
  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;
}

export default MemberRole;
