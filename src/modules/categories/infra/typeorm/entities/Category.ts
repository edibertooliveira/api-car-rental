import Car from '@modules/cars/infra/typeorm/entities/Car';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Car, car => car.categoryId)
  cars: Car[];
}
