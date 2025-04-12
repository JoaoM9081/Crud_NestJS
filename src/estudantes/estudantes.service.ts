import { ConflictException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { Estudante } from './entities/estudante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cidade } from 'src/cidades/entities/cidade.entity';
import { error } from 'console';

@Injectable()
export class EstudantesService {

  constructor(
    @InjectRepository(Estudante)
    private readonly repository: Repository<Estudante>,

    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
  ){}

  async create(dto: CreateEstudanteDto) {
    const cidade = await this.cidadeRepository.findOneBy({ nome: dto.nomeCidade });

    if (!cidade) {
      throw new NotFoundException(`Cidade com nome '${dto.nomeCidade}' não encontrada`);
    }

    const estudante = this.repository.create({
      nome: dto.nome,
      matricula: dto.matricula,
      email: dto.email,
      dataNascimento: dto.dataNascimento,
      cidade,
    });

    try {
      return await this.repository.save(estudante);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).message.includes('UNIQUE') 
      ) {
        throw new ConflictException(`Já existe um estudante com a matrícula '${dto.matricula}'`);
      }
      throw error;
    }
  }

  findAll() {
    return this.repository.find({
      relations: ['cidade'],
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['cidade'],
    });
  }

  async update(id: number, dto: UpdateEstudanteDto) {
    const estudante = await this.repository.findOneBy({ id });

    if (!estudante) {
      throw new NotFoundException(`Estudante com ID ${id} não encontrado.`);
    }

    this.repository.merge(estudante, dto);
    return this.repository.save(estudante);
  }

  async remove(id: number) {
    const estudante = await this.repository.findOneBy({ id });

    if (!estudante) {
      throw new NotFoundException(`Estudante com ID ${id} não encontrado.`);
    }

    return this.repository.remove(estudante);
  }
}