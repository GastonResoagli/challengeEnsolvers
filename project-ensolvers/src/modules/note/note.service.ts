import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NoteEntity } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { NoteDto } from './dto/note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import customError from './../../common/errors/exception.error';
import { CategoryService } from '../category/category.service';

@Injectable()
export class NoteService {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(NoteEntity)
    private noteRepo: Repository<NoteEntity>,
  ) {}

  async createNote(input: CreateNoteDto): Promise<NoteDto> {
    try {
      const note = await this.noteRepo.find({ where: { title: input.title } });

      if (!note)
        throw customError(
          'El titulo de la nota ya está en uso.',
          'duplicated tittle',
          HttpStatus.CONFLICT,
        );

      const newNote = await this.noteRepo.create(input);

      const result = await this.noteRepo.save(newNote);

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findallNotes(): Promise<NoteDto[]> {
    return this.noteRepo.find({
      where: {
        isActive: true,
      },
      relations: {
        categories: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async getNoteActive() {
    try {
      const result = await this.noteRepo.find({
        where: { isActive: true },
        relations: {
          categories: true,
        },
        order: { id: 'ASC' },
      });
      console.log(result);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNoteArchived() {
    return await this.noteRepo.find({
      where: { isActive: false },
      relations: {
        categories: true,
      },
      order: { id: 'ASC' },
    });
  }

  async getNote(id: number): Promise<NoteDto> {
    try {
      const result = await this.noteRepo.findOne({
        where: { id },
        relations: {
          categories: true,
        },
      });
      if (!result) {
        throw customError('Note not found.', 'NOT FOUND', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteNote(id: number): Promise<boolean> {
    try {
      const result = await this.noteRepo.delete(id);
      if (result.affected === 0) {
        throw customError('Note not found.', 'NOT FOUND', HttpStatus.NOT_FOUND);
      }
      return result.affected > 0;
    } catch (error) {
      throw error;
    }
  }

  async addCategoryToNote(
    noteId: number,
    categoryId: number,
  ): Promise<NoteEntity> {
    try {
      const category = await this.categoryService.getcategory(categoryId);
      const note = await this.getNote(noteId);

      if (!note || !category) {
        throw new Error('no se encontró category o note con ese id');
      }

      const updatedNote = {
        ...note,
        categories: [...note.categories, category],
      };

      const result = await this.noteRepo.save(updatedNote);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateNote(id: number, note: UpdateNoteDto) {
    try {
      const noteFound = await this.noteRepo.findOne({ where: { id } });
      if (!noteFound) {
        throw customError('Note not found.', 'NOT FOUND', HttpStatus.NOT_FOUND);
      }
      const updateNote = Object.assign(noteFound, note);
      return await this.noteRepo.save(updateNote);
    } catch (error) {
      throw error;
    }
  }
}
