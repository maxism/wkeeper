import { IsString, IsDateString, IsNumber, IsNumberString } from 'class-validator';

export class CreateProductDto {
    @IsString() readonly name: string;
    @IsString() readonly description: string;
    @IsString() readonly location: string;
    @IsDateString() readonly date?: string;
    @IsNumber() readonly count?: string;
    @IsString() readonly country?: string;
    @IsString() readonly comment?: string;
}
