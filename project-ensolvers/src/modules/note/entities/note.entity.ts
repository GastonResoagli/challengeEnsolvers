import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Categoryentity } from 'src/modules/category/entities/category.entity';

@Entity({ name: 'notes' })
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  content: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  lastUpdate: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToMany(() => Categoryentity, (Categoryentity) => Categoryentity.note)
  @JoinTable()
  categories: Categoryentity[];
}
