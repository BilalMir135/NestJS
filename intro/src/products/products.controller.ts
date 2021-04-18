import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductService } from './products.service';
import { Product } from './products.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(
    //@Body() completeBody: { name: string; desc: string; price: number }, we can get complete body like this
    @Body('name') proName: string,
    @Body('desc') proDesc: string,
    @Body('price') proPrice: number,
  ) {
    const generatedId = await this.productService.insertProduct(
      proName,
      proDesc,
      proPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    return await this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') proId: string,
    @Body() completeBody: Product,
    // @Body('name') proName: string,
    // @Body('desc') proDesc: string,
    // @Body('price') proPrice: number,
  ) {
    return await this.productService.updateProduct(proId, completeBody);
    // return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') proId: string) {
    await this.productService.deleteProduct(proId);
    return null;
  }
}
