import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Injectable()
export class AnimalsService {
  private animals: CreateAnimalDto[] = [];

  create(createAnimalDto: CreateAnimalDto) {
    const id = this.animals.length + 1;
    const newAnimal = { id, ...createAnimalDto };
    this.animals.push(newAnimal);
    return newAnimal;
  }

  findAll() {
    return this.animals;
  }

  findOne(id: number) {
    return this.animals.find((animal) => animal.id === id);
  }

  update(id: number, updateAnimalDto: CreateAnimalDto) {
    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index !== -1) {
      this.animals[index] = { id, ...updateAnimalDto };
      return this.animals[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index !== -1) {
      const [removedAnimal] = this.animals.splice(index, 1);
      return removedAnimal;
    }
    return null;
  }
}
