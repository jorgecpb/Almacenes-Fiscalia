import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        
        unique: true
    })
    nombre: string;

    @Column('text',{
        unique: false
    })
    descripcion: string;

    @Column('boolean',{
        default: true
    })
    estaActivo: boolean;
}
