import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './products.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(name: string, description: string, price: number) {
    // const productId = Math.random().toString();
    // const newProduct = new Product(productId, name, desc, price);
    // this.products.push(newProduct);
    // return productId;

    const newProduct = new this.productModel({ name, description, price });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    //return this.products; prodcusts is any array (js-obj) so it returns ref to make original products not editable outside we send copy of it
    //return [...this.products];

    const products = this.productModel.find();
    return products;
  }

  async getSingleProduct(proId: string) {
    const product = await this.findProduct(proId);
    return { ...product };
  }

  //here we are merging updated data in old data not replacing so use patch instead of put
  // updateProduct(
  //   proId: string,
  //   name: string,
  //   description: string,
  //   price: number,
  // ) {
  //   const [product, index] = this.findProduct(proId);
  //   const updatedProduct = { ...product };
  //   if (name) updatedProduct.name = name;
  //   if (desc) updatedProduct.description = desc;
  //   if (price) updatedProduct.price = price;
  //   this.products[index] = updatedProduct;
  // }

  async updateProduct(proId: String, body: Product) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      proId,
      body,
      { new: true },
    );
    return updatedProduct;
  }

  async deleteProduct(proId: string) {
    // const index = this.findProduct(proId)[1];
    // this.products.splice(index, 1);
    await this.productModel.findByIdAndDelete(proId);
  }

  // private findProduct(id: string): [Product, number] {
  //   const index = this.products.findIndex((prod) => prod.id === id);
  //   const product = this.products[index];
  //   if (!product) {
  //     throw new NotFoundException('Could not find product');
  //   }
  //   return [product, index];
  // }

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
