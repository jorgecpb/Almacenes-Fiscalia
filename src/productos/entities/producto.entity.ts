import { Categoria } from "src/categorias/entities/categoria.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true,
    })
    nombre: string;

    @Column({
        type: 'text',
        unique: false,
        nullable: true,
    })
    descripcion: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    imagen: string;

    @Column({
        type: 'boolean',
        default: true
    })
    esta_activo: boolean;

    //Relacion con Categorias
    @ManyToOne(
        () => Categoria,
        (categoria) => categoria.productos
    )
    @JoinColumn({name: 'categoria_id'})
    categoria: Categoria

}
