import { Categoria } from "src/categorias/entities/categoria.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

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
        name: 'esta_activo',
        type: 'boolean',
        default: true
    })
    estaActivo: boolean;

    //Relacion con Categorias
    @ManyToOne(
        () => Categoria,
        (categoria) => categoria.productos
    )
    @JoinColumn({name: 'categoria_id'})
    categoria: Categoria

}
