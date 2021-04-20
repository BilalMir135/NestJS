import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(createProduct: CreateProductDto) {
    const newProduct = new this.productModel(createProduct);
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = this.productModel.find();
    return products;
  }

  async getSingleProduct(proId: string) {
    const product = await this.findProduct(proId);
    return { ...product };
  }

  async getSingleProductByName(name: string) {
    const product = await this.productModel.find({ name });
    return { ...product };
  }

  async updateProduct(proId: String, body: CreateProductDto) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      proId,
      body,
      { new: true },
    );
    return updatedProduct;
  }

  async deleteProduct(proId: string) {
    await this.productModel.findByIdAndDelete(proId);
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (err) {
      throw new NotFoundException('Could not find product');
    }

    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return product._doc;
  }
}
