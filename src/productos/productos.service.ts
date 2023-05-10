import { BadRequestException, Injectable, InternalServerErrorException, 
        Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import {validate as isUUID } from 'uuid';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class ProductosService {

  private readonly logger = new Logger('ProductosService')
  
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ){}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const categoria = await this.categoriaRepository.findOne(
        createProductoDto.categoriaId,
      );
      const producto = this.productoRepository.create(createProductoDto);
      await this.productoRepository.save(producto)

      return producto;

    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0}= paginationDto

    return this.productoRepository.find({
      take:limit,
      skip: offset,

      //TODO: relaciones
    })
  }

  async findOne(term: string) {

    let producto: Producto;
  
    if(isUUID(term)){
      producto = await this.productoRepository.findOneBy({id: term});
    } else{

      const queryBuilder = this.productoRepository.createQueryBuilder();
      producto = await queryBuilder
        .where('UPPER(nombre) =:nombre or LOWER(descripcion)=:descripcion',{
          nombre: term.toUpperCase(),
          descripcion: term.toLowerCase(),
        }).getOne()
    }

    if (!producto) {
      throw new NotFoundException(`Producto con ${term} no encontrado`)      
    }

    return producto
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  async remove(id: string) {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto)

    return `Producto con id: ${id} eliminado correctamente`;
  }

  private handleDBExceptions(error:any){
    if (error.code === '23505') 
    throw new BadRequestException(error.detail);     
    
    
    this.logger.error(error);
    // console.log(error);
    throw new InternalServerErrorException('Ayuda por favor')
  }
}
