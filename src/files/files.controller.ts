import { Controller, Res, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter,fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
    
  ) {}

  @Get('producto/:imageName')
  findProductImage(
    @Res() res : Response,
    @Param('imageName') imageName: string
  ){

    const path = this.filesService.getStaticProductImage(imageName)
    res.sendFile(path)
  }

  @Post('producto')
  @UseInterceptors(FileInterceptor('imagen', {
    fileFilter: fileFilter,
    // limits: {fileSize: 1000}
    storage: diskStorage({
      destination: './static/productos',
      filename: fileNamer
    })
  }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
  ){

    if(!file){
      throw new BadRequestException('Asegurese de que el archivo sea una imagen')
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/producto/${file.filename}`

    return {secureUrl }
  }
}
