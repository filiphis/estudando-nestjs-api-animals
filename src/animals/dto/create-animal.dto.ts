import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateAnimalDto {
  @ApiProperty({ example: 'Leão', description: 'Nome do animal' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nome: string;

  @ApiProperty({ example: 5, description: 'Idade do animal' })
  @IsInt()
  @Min(0)
  idade: number;

  @ApiProperty({
    example: 'macho',
    description: 'Sexo do animal',
    enum: ['macho', 'fêmea'],
  })
  @IsString()
  @IsIn(['macho', 'fêmea'])
  sexo: string;

  @ApiProperty({ example: 'Cachorro', description: 'Espécie do animal' })
  @IsString()
  @IsNotEmpty()
  especie: string;
}
