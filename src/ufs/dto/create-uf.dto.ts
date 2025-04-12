import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUfDto {

    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    sigla: string;

    @IsString()
    @IsNotEmpty()
    nome: string;
}
