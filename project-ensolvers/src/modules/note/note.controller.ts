import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteService } from './note.service';
import { NoteDto } from './dto/note.dto';
import { NoteEntity } from './entities/note.entity';

@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  async getNotes(): Promise<NoteDto[]> {
    return this.noteService.findallNotes();
  }

  @Post()
  async createNote(@Body() input: CreateNoteDto): Promise<NoteDto> {
    return this.noteService.createNote(input);
  }

  @Get('active')
  getNotesActives(): Promise<NoteEntity[]> {
    console.log('call');
    return this.noteService.getNoteActive();
  }

  @Get('archive')
  getNoteArchived(): Promise<NoteEntity[]> {
    return this.noteService.getNoteArchived();
  }

  @Patch('/:id/addCategory')
  async addCategoryToNote(
    @Param('id') id: number,
    @Body() update: Record<'categoryId', number>,
  ) {
    console.log(update);
    return this.noteService.addCategoryToNote(id, update.categoryId);
  }

  @Get('/:id')
  async getNote(@Param() param): Promise<NoteDto> {
    return this.noteService.getNote(param.id);
  }

  @Delete('/:id')
  async deleteNote(@Param() param) {
    return this.noteService.deleteNote(param.id);
  }

  @Patch('/:id')
  async updateNote(@Param('id') id: number, @Body() note: UpdateNoteDto) {
    return this.noteService.updateNote(id, note);
  }
}
