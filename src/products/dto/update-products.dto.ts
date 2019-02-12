import { IsNumber } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
    @IsNumber() readonly id: number;
}
