import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { PaginationDto } from 'src/common/dtos/paginatio.dto';

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

  async findOne(id: string) {
    const categoria = await this.categoriaRepository.findOneBy({id})

    if (!categoria) {
      throw new NotFoundException(`Product with id ${id} no encontrado`)
    }
    return categoria;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
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
