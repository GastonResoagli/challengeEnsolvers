import { CategoryDTO } from '../../category/dto/category.dto';

export class NoteDto {
  id: number;
  title: string;
  content: string;
  isActive: boolean;
  categories: CategoryDTO[];
}
