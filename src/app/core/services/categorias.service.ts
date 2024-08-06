import { Injectable } from '@angular/core';
import { Categoria_model } from '../interfaces/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() { }

  async getAll():Promise<Categoria_model[]>{
    const res = await fetch("./assets/data/database.json");
    const resJson = await res.json();
    return resJson;
  }

  async getById(id:number): Promise<Categoria_model | undefined>{
    const res = await fetch("./assets/data/database.json");
    const resJson:Categoria_model[] = await res.json();
    const categoria = resJson.find(categoria => categoria.id === id); 
    if (categoria) return categoria;
    return
  }
}
