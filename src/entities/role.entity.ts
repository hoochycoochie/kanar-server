import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  Unique,
  BaseEntity
} from "typeorm";

import uuid from "uuid/v4";

@Entity({ name: "role" })
//@Unique(["name"])
class Role extends BaseEntity {
  constructor() {
    super();
  }
  @PrimaryColumn("uuid") public id: string;

  @Column()
  public name: string;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}

export default Role;
