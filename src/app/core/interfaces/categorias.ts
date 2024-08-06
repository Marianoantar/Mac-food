import { Producto_model } from "./productos";

export interface Categoria_model {
        id: number;
        nombre: string;
        fotoUrl: string;
        productos: Producto_model[]
}
