import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './types/animal.type';

@Injectable()
export class AnimalsService {
  private animals: Animal[] = [];

  create(createAnimalDto: CreateAnimalDto): Animal {
    const id = this.animals.length + 1;
    const newAnimal = { id, ...createAnimalDto };
    this.animals.push(newAnimal);
    return newAnimal;
  }

  findAll(): Animal[] {
    return this.animals;
  }

  findOne(id: number): Animal | undefined {
    return this.animals.find((animal) => animal.id === id);
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto): Animal | undefined {
    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index !== -1) {
      const existingAnimal = this.animals[index];
      const updatedAnimal: Animal = { ...existingAnimal, ...updateAnimalDto };
      this.animals[index] = updatedAnimal;
      return updatedAnimal;
    }
    return undefined;
  }

  remove(id: number): Animal | null {
    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index !== -1) {
      const [removedAnimal] = this.animals.splice(index, 1);
      return removedAnimal;
    }
    return null;
  }
}
