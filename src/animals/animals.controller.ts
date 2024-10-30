import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  async create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  async findAll() {
    this.animalsService.findAll();
  }

  @Get(':id')
  async findOnde(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnimalDto: CreateAnimalDto,
  ) {
    return this.animalsService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.animalsService.remove(+id);
  }
}
