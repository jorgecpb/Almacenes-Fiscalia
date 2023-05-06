import { BadRequestException, Injectable, InternalServerErrorException, 
        Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import {validate as isUUID} from 'uuid';

@Injectable()
export class CategoriasService {

  private readonly logger = new Logger('CategoriasService')
 

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ){}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {

      const categoria  = this.categoriaRepository.create(createCategoriaDto);
      await this.categoriaRepository.save(categoria)

      return categoria;

    } catch (error) {
      this.handleDBExceptions(error)         
    }
  }

  findAll(paginationDto:PaginationDto) {
    const {limit = 10, offset = 0}= paginationDto

    return this.categoriaRepository.find({
      take: limit,
      skip: offset,
      //TODO: relaciones
    })
  }

  async findOne(term: string) {
    let categoria: Categoria;

    if (isUUID(term)) {
      categoria = await this.categoriaRepository.findOneBy({id: term});
    } else{
      // categoria = await this.categoriaRepository.findOneBy({nombre: term});

      const queryBuilder = this.categoriaRepository.createQueryBuilder();
      categoria = await queryBuilder
        .where('UPPER(nombre) =:nombre or LOWER(descripcion)=:descripcion',{
          nombre: term.toUpperCase(),
          descripcion: term.toLowerCase(),
        }).getOne();
    }

    if (!categoria) {
      throw new NotFoundException(`Categoria con ${term} no encontrado`)
    }
    return categoria;
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.categoriaRepository.preload({
      id: id,
      ...updateCategoriaDto
    }) 

    if (!categoria) throw new NotFoundException(`Categoria with id: ${id} not found`)

    try {
      await this.categoriaRepository.save(categoria)
      return categoria;
      
    } catch (error) {
      this.handleDBExceptions(error)
      
    }
  }

  async remove(id:string) {
    const categoria = await this.findOne(id);
     await this.categoriaRepository.remove(categoria)

    return 'Categoría eliminada correctamente'
  }


  private handleDBExceptions(error:any){
    if (error.code === '23505') 
    throw new BadRequestException(error.detail);     
    
    
    this.logger.error(error);
    // console.log(error);
    throw new InternalServerErrorException('Ayuda por favor')
  }
}
