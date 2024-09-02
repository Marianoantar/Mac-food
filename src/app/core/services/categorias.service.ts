import { Injectable } from '@angular/core';
import { Categoria_model } from '../interfaces/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() { }

  async getAll():Promise<Categoria_model[]>{
    // const res = await fetch("./assets/data/database.json"); // NO EXISTE MAS EL ARCHIVO EN APP
    // const res = await fetch("http://localhost:3000/product"); // PRUEBA ARCHIVO EN SERVIDOR LOCAL
    const res = await fetch("https://backend-rapid-food.onrender.com/product"); // ARCHIVO EN SERVIDOR (NUBE 

    const resJson = await res.json();
    return resJson;
  }

  async getById(id:number): Promise<Categoria_model | undefined>{
    // const res = await fetch("./assets/data/database.json"); // NO EXISTE MAS EL ARCHIVO EN APP
    // const res = await fetch("http://localhost:3000/product"); // PRUEBA ARCHIVO EN SERVIDOR LOCAL
    const res = await fetch("https://backend-rapid-food.onrender.com/product"); // ARCHIVO EN SERVIDOR (NUBE)

    const resJson:Categoria_model[] = await res.json();
    const categoria = resJson.find(categoria => categoria.id === id); 
    if (categoria) return categoria;
    return
  }
}
