import { Module } from '@nestjs/common';
import { EstudantesService } from './estudantes.service';
import { EstudantesController } from './estudantes.controller';
import { Type } from 'class-transformer';
import { Cidade } from 'src/cidades/entities/cidade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudante } from './entities/estudante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudante, Cidade])],
  controllers: [EstudantesController],
  providers: [EstudantesService],
})
export class EstudantesModule {}
