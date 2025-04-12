import { Cidade } from "src/cidades/entities/cidade.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("UFs")
export class Uf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sigla: string;

  @Column()
  nome: string;

  @OneToMany(() => Cidade, cidade => cidade.uf)
  cidades: Cidade[];
}
