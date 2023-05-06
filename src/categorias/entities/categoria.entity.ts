import { Producto } from "src/productos/entities/producto.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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


    //Relación con Productos
    @OneToMany(
        () => Producto,
        (producto) => producto.categoria,
        {cascade: true}
    )
    productos?: Producto[];

    @BeforeInsert()
    checkDescripcionInsert(){
        if(!this.descripcion){
            this.descripcion = this.nombre+ ' descripcion'
        }

        this.descripcion = this.descripcion
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }


    @BeforeUpdate()
    checkDescripcionUpdate(){
        this.descripcion = this.descripcion
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }
}
