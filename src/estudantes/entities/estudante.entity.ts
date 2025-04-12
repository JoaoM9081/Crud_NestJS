import { Cidade } from "src/cidades/entities/cidade.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("estudantes")
export class Estudante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  matricula: string;

  @Column()
  email: string;

  @Column()
  dataNascimento: Date;

  @ManyToOne(() => Cidade, cidade => cidade.estudantes)
  cidade: Cidade;
}
