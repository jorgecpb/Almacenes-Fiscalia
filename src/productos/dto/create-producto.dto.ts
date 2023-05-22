import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

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
    estaActivo?: boolean;

    @IsNumber()
    categoriaId: number;
    
}