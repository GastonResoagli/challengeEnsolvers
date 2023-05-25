import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './entities/note.entity';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity]), CategoryModule],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
