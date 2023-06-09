import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {

    @IsString()
    @MinLength(2)
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsBoolean()
    @IsOptional()
    esta_activo?: boolean;

}
