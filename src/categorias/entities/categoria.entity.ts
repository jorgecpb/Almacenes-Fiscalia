import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true
    })
    nombre: string;

    @Column({
        type: 'text',
        unique: false
    })
    descripcion: string;

    @Column({
        type: 'boolean',
        default: true
    })
    esta_activo: boolean;

    @BeforeInsert()
    checkDescripcionInsert(){
        if(!this.descripcion){
            this.descripcion = this.nombre
        }

        this.descripcion = this.descripcion
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }


    // @BeforeUpdate()
}
