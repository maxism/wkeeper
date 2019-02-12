import { IsString } from 'class-validator';

export class CreateProductDto {
    @IsString() readonly name: string;
    @IsString() readonly description: string;
    @IsString() readonly location: string;
}
