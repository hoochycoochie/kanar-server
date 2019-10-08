import { Column } from 'typeorm';

export class Name {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;
}
