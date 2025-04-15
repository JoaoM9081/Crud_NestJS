import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateEstudanteDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    matricula: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    dataNascimento: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nomeCidade: string;
}
