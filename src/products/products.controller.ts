import { Controller, Get, Post, Body, UsePipes, Res, Param, Delete, UseInterceptors, FileInterceptor, UploadedFile, HttpStatus, HttpException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { ProductsService } from './products.service';
import { Product } from './entity/product.entity';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { ParseUintPipe } from './common/pipes/parse-int.pipe';
import { multerOptions } from './multer.config';

@Controller('api/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('img', multerOptions))
    async create(@Body() createProductDto: CreateProductDto, @UploadedFile() image) {
        this.productsService.create(createProductDto, image);
    }

    @Post(':id')
    @UsePipes(ValidationPipe)
    async updateInfo(@Param('id', ParseUintPipe) id, @Body() updateProductDto: UpdateProductDto) {
        this.productsService.updateInfo(updateProductDto);
    }

    @Post(':id/image')
    @UseInterceptors(FileInterceptor('img', multerOptions))
    async updateImage(@Param('id', ParseUintPipe) id, @UploadedFile() image) {
        this.productsService.updateImage(id, image);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return await this.productsService.findAll();
    }

    @Get(':id')
    async getProductById(@Param('id', ParseUintPipe) id) {
        const product = await this.productsService.getProductById(id);
        if (product == null) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Такого продукта не существует',
              }, HttpStatus.NOT_FOUND);
        }
        delete product.image;
        return product;
    }

    @Get(':id/image')
    async getImageById(@Param('id', ParseUintPipe) id, @Res() res) {
        const product = await this.productsService.getProductById(id);
        if (product == null) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Такого продукта не существует',
              }, HttpStatus.NOT_FOUND);
        } else {
            if (product.image == null) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Изображение не доступно',
                  }, HttpStatus.NOT_FOUND);
            } else {
                res.sendFile(product.image);
            }
        }
    }

    @Delete(':id')
    deleteById(@Param('id', ParseUintPipe) id) {
        this.productsService.deleteById(id);
    }
}
