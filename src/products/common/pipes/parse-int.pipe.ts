import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseUintPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata) {
        const val = parseInt(value, 10);
        if (isNaN(val) || val < 0) {
            throw new BadRequestException('Ошибка валидации');
        }
        return val;
    }
}
