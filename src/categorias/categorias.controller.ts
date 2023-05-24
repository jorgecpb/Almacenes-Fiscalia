import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { CategoriasService } from './categorias.service';

import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    
    return this.categoriasService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term:string) {
    return this.categoriasService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() updateCategoriaDto: UpdateCategoriaDto) 
    {
      return this.categoriasService.update(+id, updateCategoriaDto);
    }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriasService.remove(+id);
  }
}
