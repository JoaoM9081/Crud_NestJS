import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Unique } from "typeorm";

export class CreateEstudanteDto {

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    matricula: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsDateString()
    @IsNotEmpty()
    dataNascimento: Date;

    @IsNotEmpty()
    @IsString()
    nomeCidade: string;
}
