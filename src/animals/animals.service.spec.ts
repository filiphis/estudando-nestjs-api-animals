import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

describe('AnimalsService', () => {
  let service: AnimalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalsService],
    }).compile();

    service = module.get<AnimalsService>(AnimalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um novo animal', () => {
    const createAnimalDto: CreateAnimalDto = {
      nome: 'Leão',
      idade: 5,
      sexo: 'macho',
      especie: 'Felino',
    };

    const result = service.create(createAnimalDto);

    expect(result).toEqual({
      id: 1,
      ...createAnimalDto,
    });
  });

  it('deve retornar uma lista de animais', () => {
    const createAnimalDto: CreateAnimalDto = {
      nome: 'Tigre',
      idade: 4,
      sexo: 'macho',
      especie: 'Felino',
    };

    service.create(createAnimalDto);

    const result = service.findAll();

    expect(result).toEqual([
      {
        id: 1,
        ...createAnimalDto,
      },
    ]);
  });

  it('deve retornar um animal pelo ID', () => {
    const createAnimalDto: CreateAnimalDto = {
      nome: 'Girafa',
      idade: 7,
      sexo: 'fêmea',
      especie: 'Mamífero',
    };

    service.create(createAnimalDto);

    const result = service.findOne(1);

    expect(result).toEqual({
      id: 1,
      ...createAnimalDto,
    });
  });

  it('deve retornar undefined se o animal não existir', () => {
    const result = service.findOne(999);

    expect(result).toBeUndefined();
  });

  it('deve atualizar um animal existente', () => {
    const createAnimalDto: CreateAnimalDto = {
      nome: 'Zebra',
      idade: 5,
      sexo: 'fêmea',
      especie: 'Mamífero',
    };

    service.create(createAnimalDto);

    const updateAnimalDto: UpdateAnimalDto = {
      idade: 6,
    };

    const result = service.update(1, updateAnimalDto);

    expect(result).toEqual({
      id: 1,
      nome: 'Zebra',
      idade: 6,
      sexo: 'fêmea',
      especie: 'Mamífero',
    });
  });

  it('deve retornar undefined se tentar atualizar um animal inexistente', () => {
    const updateAnimalDto: UpdateAnimalDto = {
      idade: 6,
    };

    const result = service.update(999, updateAnimalDto);

    expect(result).toBeUndefined();
  });

  it('deve remover um animal existente', () => {
    const createAnimalDto: CreateAnimalDto = {
      nome: 'Elefante',
      idade: 10,
      sexo: 'macho',
      especie: 'Mamífero',
    };

    service.create(createAnimalDto);

    const result = service.remove(1);

    expect(result).toEqual({
      id: 1,
      ...createAnimalDto,
    });

    const animals = service.findAll();
    expect(animals).toEqual([]);
  });

  it('deve retornar null se tentar remover um animal inexistente', () => {
    const result = service.remove(999);

    expect(result).toBeNull();
  });
});
