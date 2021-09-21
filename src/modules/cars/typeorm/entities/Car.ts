import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {ICar} from "../../domain/models/ICar";

@Entity('cars')
export default class Car implements ICar {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string
  
  @Column()
  brand: string
  
  @Column()
  description: string
  
  @Column()
  daily_rate: Number
  
  @Column()
  available: Boolean
  
  @Column()
  license_plate: string

  @CreateDateColumn()
  created_at: Date
  
}

