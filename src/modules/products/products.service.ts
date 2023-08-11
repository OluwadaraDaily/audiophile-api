import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRespository: Repository<Product>
  ) {}
  async create(payload: CreateProductDto): Promise<Product> {
    const product = await this.productRespository.create({
      ...payload,
      deleted_at: null
    })
    await this.productRespository.save(product)
    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRespository.find({
      where: { deleted_at: IsNull() }
    })

    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRespository.findOne({
      where: { id, deleted_at: IsNull() }
    })
    if (!product) {
      throw new HttpException(`Product with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return product;
  }

  async update(id: string, payload: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id)
    const updatedProduct = {
      ...product,
      ...payload
    }
    await this.productRespository.save(updatedProduct)
    return updatedProduct;
  }

  async remove(id: string): Promise<any> {
    const product = await this.findOne(id)
    await this.productRespository.delete(id)
    return { message: "Category deleted successfully" };
  }
}
