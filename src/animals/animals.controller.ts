import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Animal } from './entities/animal.entity';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo animal' })
  @ApiCreatedResponse({
    description: 'Animal criado com sucesso.',
    type: Animal,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os animais' })
  @ApiResponse({
    status: 200,
    description: 'Lista de animais retornada com sucesso.',
    type: [Animal],
  })
  async findAll() {
    return this.animalsService.findAll();
  }

  @ApiOperation({ summary: 'Obter um animal pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Animal retornado com sucesso.',
    type: Animal,
  })
  @ApiNotFoundResponse({ description: 'Animal não encontrado.' })
  @Get(':id')
  async findOnde(@Param('id') id: string) {
    const animal = await this.animalsService.findOne(+id);

    if (!animal) {
      throw new NotFoundException(`Animal com ID ${id} não encontrado.`);
    }

    return animal;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um animal existente' })
  @ApiResponse({
    status: 200,
    description: 'Animal atualizado com sucesso.',
    type: Animal,
  })
  @ApiNotFoundResponse({ description: 'Animal não encontrado.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    const updatedAnimal = await this.animalsService.update(
      +id,
      updateAnimalDto,
    );

    if (!updatedAnimal) {
      throw new NotFoundException(`Animal com ID ${id} não encontrado.`);
    }

    return updatedAnimal;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um animal' })
  @ApiNoContentResponse({ description: 'Animal removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Animal não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const deletedAnimal = this.animalsService.remove(+id);

    if (!deletedAnimal) {
      throw new NotFoundException(`Animal com ID ${id} não encontrado.`);
    }
  }
}
