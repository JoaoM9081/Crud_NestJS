import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { Repository } from 'typeorm';
import { Cidade } from './entities/cidade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Uf } from 'src/ufs/entities/uf.entity';

@Injectable()
export class CidadesService {

  constructor(
    @InjectRepository(Cidade)
    private readonly repository: Repository<Cidade>, 

    @InjectRepository(Uf)
    private readonly Ufrepository: Repository<Uf>, 


  ) {}

  async create(dto: CreateCidadeDto) {
    const uf = await this.Ufrepository.findOneBy({ nome: dto.nomeUf });
    if (!uf) {
      throw new NotFoundException(`UF com nome '${dto.nomeUf}' não encontrada`);
    }

    const cidade = this.repository.create({
      nome: dto.nome,
      uf,
    });

    return this.repository.save(cidade);
  }

  findAll() {
    return this.repository.find({
      relations: ['uf'],
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['uf'],
    });
  }

  async update(id: number, dto: UpdateCidadeDto) {
    const cidade = await this.repository.findOneBy({ id });

    if (!cidade) {
      throw new NotFoundException(`Cidade com ID ${id} não encontrada.`);
    }

    this.repository.merge(cidade, dto);
    return this.repository.save(cidade);
  }

  async remove(id: number) {
    const cidade = await this.repository.findOneBy({ id });

    if (!cidade) {
      throw new NotFoundException(`Cidade com ID ${id} não encontrada.`);
    }

    return this.repository.remove(cidade);
  }
}