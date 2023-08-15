import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  create(@Body() payload: CreateBillingDto) {
    return this.billingService.create(payload);
  }

  @Get()
  findAll() {
    return this.billingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBillingDto) {
    return this.billingService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingService.remove(id);
  }
}
