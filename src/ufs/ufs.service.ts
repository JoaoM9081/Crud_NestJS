import { Injectable } from '@nestjs/common';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';
import { Repository } from 'typeorm';
import { Uf } from './entities/uf.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UfsService {

  constructor(
    @InjectRepository(Uf)
    private readonly repository: Repository<Uf>,
  ){}


  create(dto: CreateUfDto) {
    const ufs = this.repository.create(dto);
    return this.repository.save(ufs);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateUfDto) {
    const uf = await this.repository.findOneBy({ id });

    if (!uf) {
      throw new Error(`Uf com ID ${id} não encontrado.`);
    }

    this.repository.merge(uf, dto);
    return this.repository.save(uf);
  }

  async remove(id: number) {
    const uf = await this.repository.findOneBy({ id });

    if (!uf) {
      throw new Error(`Uf com ID ${id} não encontrado.`);
    }

    return this.repository.remove(uf);
  }
}