import { Injectable } from '@angular/core';
import { Producto_model } from '../interfaces/productos';
import { Categoria_model } from '../interfaces/categorias';
import { BusquedaModel } from '../interfaces/busqueda';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }

  async getProductsByCategoria(id:number): Promise<Producto_model[]>{
    // const res = await fetch("./assets/data/database.json"); //NO EXISTE MAS EL ARCHIVO DENTRO DE APP
    // const res = await fetch("http://localhost:3000/product"); //ARCHIVO EN SERVIDOR LOCAL
    const res = await fetch("https://backend-rapid-food.onrender.com/product"); //ARCHIVO EN SERVIDOR (NUBE)
    const resJson:Categoria_model[] = await res.json();
    const productos = resJson.find(categoria => categoria.id === id)?.productos; 
    if (productos) return productos;
    return [];
  }

  async getAll():Promise<Producto_model[]>{
    // const res = await fetch("./../../../assets/data/database.json"); //NO EXISTE MAS EL ARCHIVO DENTRO DE APP
    // const res = await fetch("http://localhost:3000/product"); //ARCHIVO EN SERVIDOR LOCAL
    const res = await fetch("https://backend-rapid-food.onrender.com/product"); //ARCHIVO EN SERVIDOR (NUBE)

    const resJson:Categoria_model[] = await res.json();

    let productos:Producto_model[] = [];

    resJson.forEach(categoria => {
      productos = [...productos, ...categoria.productos];
    });
    return productos;
  }
  
  async getById(id:number): Promise <Producto_model | undefined> {
    try {
      const productos = await this.getAll();
      const productoElegido = productos.find(producto => producto.id === id);
      return productoElegido;
    } catch (err) {
      console.error("Error al obtener el producto:", err);
      return undefined;
    }
  }

  async buscar(parametros: BusquedaModel){
    const productos = await this.getAll();
    const productosFiltrados = productos.filter(producto => {
      if(parametros.aptoVegano &&!producto.esVegano) return false; 
      if(parametros.aptoCeliaco &&!producto.esCeliaco) return false;
      const busquedaEnTitulo = producto.nombre.toLowerCase().includes(parametros.texto.toLowerCase());
      if(busquedaEnTitulo) return true;
      for(let i = 0; i < producto.ingredientes.length; i++){
        const busquedaEnIngredientes = producto.ingredientes[i].toLowerCase().includes(parametros.texto.toLowerCase());
        if(busquedaEnIngredientes) return true;
      }
      return false;  // No se ha encontrado ninguna coincidencia en ingredientes, continuamos con el siguiente producto.  // Si no se ha encontrado ninguna coincidencia en el título ni en los ingredientes, el producto se descarta.  // Devolvemos false para indicar que el producto no cumple con los criterios de búsqueda.  // Este código se ejecuta sólo si la condición de
    });
    return productosFiltrados;
  }

}