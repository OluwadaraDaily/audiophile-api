import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  async create(@Body() payload: CreateCartDto) {
    return await this.cartsService.create(payload);
  }

  @Get('?')
  findAll(@Query('is_active') isActive: string | undefined) {
    return this.cartsService.findAll(isActive);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCartDto) {
    return this.cartsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
