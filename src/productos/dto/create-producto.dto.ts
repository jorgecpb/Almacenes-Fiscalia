import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductoDto {

    @IsString()
    @MinLength(2)
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsOptional()
    imagen?: string;

    @IsBoolean()
    @IsOptional()
    esta_activo?: boolean;

    @IsString()
    // @IsOptional()
    categoriaId: string;

    
}