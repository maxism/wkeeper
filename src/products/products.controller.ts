import { Controller, Get, Post, Body, UsePipes, Res, Param, Delete, UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { ProductsService } from './products.service';
import { Product } from './entity/product.entity';
import { ValidationPipe } from './common/validation.pipe';
import { RedirectInterceptor } from './redirect.interceptor';
import { multerOptions } from './multer.config';
import { identity } from 'rxjs';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('img', multerOptions))
    async create(@Body() createProductDto: CreateProductDto, @UploadedFile() image) {
        this.productsService.create(createProductDto, image.path);
    }

    @Post(':id')
    @UsePipes(ValidationPipe)
    async updateInfo(@Body() updateProductDto: UpdateProductDto, @UploadedFile() image) {
        this.productsService.updateInfo(updateProductDto);
    }

    @Post(':id/image')
    @UseInterceptors(FileInterceptor('img', multerOptions))
    async updateImage(@Param('id') id, @UploadedFile() image) {
        this.productsService.updateImage(id, image.path);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return await this.productsService.findAll();
    }

    @Get(':id')
    async getProductById(@Param('id') id) {
        const product = await this.productsService.getProductById(id);
        delete product.image;
        return product;
    }

    @Get(':id/image')
    async getImageById(@Param('id') id, @Res() res) {
        //const product = await this.productsService.getProductById(id);
        this.productsService.getProductById(id)
            .then(product => { 
                if (product.image) {
                    res.sendFile(product.image);
                }
                 });
    }

    @Delete(':id')
    deleteById(@Param('id') id) {
        this.productsService.deleteById(id);
    }
}
