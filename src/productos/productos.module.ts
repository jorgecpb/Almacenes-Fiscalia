import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';

import { Producto } from './entities/producto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports:[
    TypeOrmModule.forFeature([Producto]),
    TypeOrmModule.forFeature([Categoria])
  ]
})
export class ProductosModule {}
