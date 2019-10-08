import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  BaseEntity
} from "typeorm";

import uuid from "uuid/v4";
import Role from "./role.entity";

@Entity({ name: "member" })
class Member extends BaseEntity {
  @PrimaryColumn("uuid") public id: string;
  @Column({ type: "varchar" })
  public name: string;

  @Column({ type: "varchar" })
  public fullname: string;
  @Column({ type: "varchar" })
  public lastname: string;

  @Column({ type: "boolean" })
  public confirmed: boolean;

  @Column({ type: "boolean" })
  public is_active: boolean;

  @Column({ type: "text", unique: true })
  public email: string;

  @Column({ type: "varchar", nullable: true })
  picture: string;

  @Column({ type: "varchar", nullable: true })
  picture_public_id: string;

  @Column()
  public password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: "member_role"
  })
  roles: Role[];
  @BeforeInsert()
  addId() {
    this.id = uuid();
    this.fullname = `${this.name} ${this.lastname}`;
  }
}

export default Member;
