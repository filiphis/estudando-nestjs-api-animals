import { ApiProperty } from '@nestjs/swagger';

export class Animal {
  @ApiProperty({ example: 1, description: 'ID do animal' })
  id: number;

  @ApiProperty({ example: 'Leão', description: 'Nome do animal' })
  nome: string;

  @ApiProperty({ example: 5, description: 'Idade do animal' })
  idade: number;

  @ApiProperty({ example: 'macho', description: 'Sexo do animal' })
  sexo: string;

  @ApiProperty({ example: 'Cachorro', description: 'Espécie do animal' })
  especie: string;
}
