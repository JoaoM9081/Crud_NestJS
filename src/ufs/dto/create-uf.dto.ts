import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUfDto {

    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    @ApiProperty()
    sigla: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nome: string;
}