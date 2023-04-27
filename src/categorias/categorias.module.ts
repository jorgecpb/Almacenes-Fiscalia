import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';

import { Categoria } from './entities/categoria.entity';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService],
  imports: [
    TypeOrmModule.forFeature([Categoria])
  ]
})
export class CategoriasModule {}
