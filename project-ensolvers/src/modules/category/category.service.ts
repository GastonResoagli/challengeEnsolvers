import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categoryentity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO } from './dto/create-category.dtp';
import { CategoryDTO } from './dto/category.dto';
import customError from './../../common/errors/exception.error';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categoryentity)
    private categoryRepo: Repository<Categoryentity>,
  ) {}

  async createcategory(input: CreateCategoryDTO): Promise<CategoryDTO> {
    const newCategory = await this.categoryRepo.create(input);

    const result = await this.categoryRepo.save(newCategory);
    console.log(result);

    return result;
  }

  async findallCategories(): Promise<CategoryDTO[]> {
    return this.categoryRepo.find();
  }

  async getcategory(id: number): Promise<CategoryDTO> {
    try {
      const result = await this.categoryRepo.findOne({ where: { id } });
      if (!result) {
        throw customError(
          'category not found.',
          'NOT FOUND',
          HttpStatus.NOT_FOUND,
        );
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: number): Promise<boolean> {
    try {
      const result = await this.categoryRepo.delete(id);
      if (result.affected === 0) {
        throw customError(
          'category not found',
          'NOT FOUND',
          HttpStatus.NOT_FOUND,
        );
      }
      return result.affected > 0;
    } catch (error) {
      throw error;
    }
  }
}
