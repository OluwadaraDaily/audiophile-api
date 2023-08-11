import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { IsNull, Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) { }
  
  async create(payload: CreateCategoryDto): Promise<Category> {
    const { name } = payload
    let category = await this.categoryRepository.findOne({
      where: { name }
    })
    if (category) {
      throw new HttpException(`Category with name ${name} already exists`, HttpStatus.CONFLICT)
    }
    category = await this.categoryRepository.create({
      ...payload,
      deleted_at: null
    })

    await this.categoryRepository.save(category)

    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      where: { deleted_at: IsNull() }
    })
    return categories;
  }

  async findAllProducts(id: string): Promise<Product[]> {
    const category = await this.findOne(id)

    const productsInCategory = await this.productRepository.find({
      where: { category: { id: category.id }, deleted_at: IsNull() }
    })

    return productsInCategory;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id, deleted_at: IsNull() }
    })
    if (!category) {
      throw new HttpException(`Category with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }

    return category;
  }

  async update(id: string, payload: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id)
    
    const updatedCategory = {
      ...category,
      name: payload.name,
      deleted_at: null
    }
    await this.categoryRepository.save(updatedCategory)

    return updatedCategory;
  }

  async remove(id: string): Promise<any> {
    const category = await this.findOne(id)
    await this.categoryRepository.delete(category.id)
    return { message: "Category deleted successfully" };
  }
}
