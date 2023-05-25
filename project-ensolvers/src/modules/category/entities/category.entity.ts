import { PrimaryGeneratedColumn, Entity, Column, ManyToMany } from 'typeorm';
import { NoteEntity } from 'src/modules/note/entities/note.entity';

@Entity({ name: 'categories' })
export class Categoryentity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => NoteEntity)
  note: NoteEntity[];
}
