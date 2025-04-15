import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCidadeDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nome: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nomeUf: string;
}