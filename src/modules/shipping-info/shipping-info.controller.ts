import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShippingInfoService } from './shipping-info.service';
import { CreateShippingInfoDto } from './dto/create-shipping-info.dto';
import { UpdateShippingInfoDto } from './dto/update-shipping-info.dto';

@Controller('shipping-info')
export class ShippingInfoController {
  constructor(private readonly shippingInfoService: ShippingInfoService) {}

  @Post()
  create(@Body() payload: CreateShippingInfoDto) {
    return this.shippingInfoService.create(payload);
  }

  @Get()
  findAll() {
    return this.shippingInfoService.findAll();
  }

  @Get('user/:user_id')
  findAllforUser(@Param('user_id') userId: string) {
    return this.shippingInfoService.findAllforUser(userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingInfoService.findOne(id);
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShippingInfoDto: UpdateShippingInfoDto) {
    return this.shippingInfoService.update(id, updateShippingInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingInfoService.remove(id);
  }
}
