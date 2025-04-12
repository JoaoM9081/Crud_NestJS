import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCidadeDto {

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    @IsString()
    nomeUf: string;
}