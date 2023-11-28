import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UsersCategories } from './users_categories.entity';

@Entity({schema: 'users'})
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => UsersCategories, usersCategories => usersCategories.users)
  usersCategories?: UsersCategories;
}