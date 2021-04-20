import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProductService } from './product.service';
import {
  CreateProductDto,
  CreateProductResDto,
  UserDto,
} from './dto/createProduct.dto';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCreatedResponse({ type: CreateProductResDto })
  @ApiBadRequestResponse({ description: 'Error' })
  @Post()
  async addProduct(@Body() createProduct: CreateProductDto) {
    const generatedId = await this.productService.insertProduct(createProduct);
    return { id: generatedId };
  }

  @ApiOkResponse({ type: UserDto, isArray: true })
  @Get()
  async getAllProducts() {
    return await this.productService.getProducts();
  }

  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    return await this.productService.getSingleProduct(prodId);
  }

  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  @Get('byName')
  async getProductByName(@Query('name') name: string) {
    const product = await this.productService.getSingleProductByName(name);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') proId: string,
    @Body() completeBody: CreateProductDto,
  ) {
    return await this.productService.updateProduct(proId, completeBody);
  }

  @Delete(':id')
  async removeProduct(@Param('id') proId: string) {
    await this.productService.deleteProduct(proId);
    return null;
  }
}
