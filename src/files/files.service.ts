import {join} from 'path'

import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
   
  getStaticProductImage(imageName: string){
    const path = join(__dirname, '../../static/productos', imageName);

    if(!existsSync(path))
      throw new BadRequestException(`No se encontró el producto con la imagen ${imageName}`)

    return path
  }
}
