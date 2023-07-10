import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from './users.entity';

@Entity({schema: 'users'})
export class UsersCategories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @OneToMany(() => Users, (user: Users) => user.usersCategories)
  users: Users[];
}