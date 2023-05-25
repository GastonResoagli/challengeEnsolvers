import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dtp';
import { CategoryDTO } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getCategories(): Promise<CategoryDTO[]> {
    return this.categoryService.findallCategories();
  }
  @Post()
  async createCategory(@Body() input: CreateCategoryDTO): Promise<CategoryDTO> {
    return this.categoryService.createcategory(input);
  }

  @Get('/:id')
  async getCategory(@Param() param): Promise<CategoryDTO> {
    return this.categoryService.getcategory(param.id);
  }

  @Delete('/:id')
  async deleteCategory(@Param() param) {
    return this.categoryService.deleteCategory(param.id);
  }
}
