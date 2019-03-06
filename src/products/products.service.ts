import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { IProduct } from './interfaces/products.interfaces';
import { unlinkSync } from 'fs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(info: IProduct, image: any) {
    const product = this.productRepository.create(info);
    if (image !== undefined) {
      product.image = image.path;
    } else {
      product.image = undefined;
    }
    await this.productRepository.save(product);
  }

  async updateInfo(info: IProduct) {
    await this.productRepository.update(info.id, info);
  }

  async updateImage(id: string, image: any) {
    if (image !== undefined) {
      this.unlinkImageById(+id);
      await this.productRepository.update(+id, { image: image.path });
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    for (const product of products) {
      delete product.image;
    }
    return products;
  }

  async getProductById(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async deleteById(id: number) {
    this.unlinkImageById(id);
    return await this.productRepository.delete(id);
  }

  async unlinkImageById(id: number) {
    const product = await this.productRepository.findOne(id);
    if (product.image) {
      unlinkSync(product.image);
    }
  }
}
