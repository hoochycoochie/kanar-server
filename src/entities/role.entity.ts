import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  Unique,
  BaseEntity,
} from 'typeorm';

import uuid from 'uuid/v4';

@Entity({ name: 'role' })
//@Unique(["name"])
class Role extends BaseEntity {
  @PrimaryColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  public name: string;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}

export default Role;
