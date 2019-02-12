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

    async create(info: IProduct, path: string) {
        const product = this.productRepository.create(info);
        product.image = path;
        await this.productRepository.save(product);
    }

    async updateInfo(info: IProduct) {
        await this.productRepository.update(info.id, info);
    }

    async updateImage(id: string, path: string) {
        await this.productRepository.update(+id, { image: path });
    }

    async findAll(): Promise<Product[]> {
        let products = await this.productRepository.find();
        for (let product of products) {
            delete product.image;
        }
        return products;
    }

    async getProductById(id: string): Promise<Product> {
        return await this.productRepository.findOne(id);
    }

    async deleteById(id: string) {
        const product = await this.productRepository.findOne(id);
        unlinkSync(product.image);
        this.productRepository.delete(id);
    }
}
