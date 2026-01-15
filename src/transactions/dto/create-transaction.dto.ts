import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsBoolean,
  MinLength,
} from 'class-validator';
export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsInt()
  @MinLength(0)
  quantity: number;

  @IsInt()
  @MinLength(1)
  pricePerUnit: number;

  @IsBoolean()
  hasImage: boolean = false;
}
