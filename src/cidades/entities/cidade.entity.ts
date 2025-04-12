import { Estudante } from "src/estudantes/entities/estudante.entity";
import { Uf } from "src/ufs/entities/uf.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("cidades")
export class Cidade {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(() => Uf, uf => uf.cidades)
    uf: Uf;

    @OneToMany(() => Estudante, estudante => estudante.cidade)
    estudantes: Estudante[];
}