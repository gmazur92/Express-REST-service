import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash, genSaltSync } from 'bcryptjs';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
  })
  password!: string;

  @Column({
    type: 'varchar',
  })
  login!: string;

  @Column({
    type: 'varchar',
  })
  name!: string;

  @BeforeInsert()
  @BeforeUpdate()
  protected async hashPassword() {
    this.password = await hash(this.password, genSaltSync(10));
  }
}
