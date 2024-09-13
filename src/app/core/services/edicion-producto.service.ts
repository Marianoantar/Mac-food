import { inject, Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { Producto_model } from '../interfaces/productos';
import { Categoria_model } from '../interfaces/categorias';
import { ServerVarService } from './server-var.service';

@Injectable({
  providedIn: 'root'
})
export class EdicionProductoService implements OnInit{

  serverVar = inject(ServerVarService);


  rubro: WritableSignal<Categoria_model> = signal({id: 0, nombre: '', fotoUrl: '', productos: []});

  constructor() { 
  }

  ngOnInit(): void {
  }

  async actualizarRubro(id:number): Promise<void>{
    const res = await fetch(this.serverVar.urlServer + "/product"); // ARCHIVO EN SERVIDOR (NUBE 

    const resJson:Categoria_model[] = await res.json();
    const categoria = resJson.find(categoria => categoria.id === id); 
    if (categoria) {
      this.rubro.set(categoria);
    } 
    return
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(this.serverVar.urlServer + '/product/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }); 
      this.actualizarRubro(this.rubro().id)
      return response.json();
    } catch (error) {
      console.error('Error al borrar el producto:', error);
    }
  }
  
  async put(idProducto:number, producto: Producto_model): Promise<any> {
    try {
      const response = await fetch(this.serverVar.urlServer + '/product/' + idProducto, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });
      
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      
    }
  }

  async post(producto:Producto_model): Promise<any> {
    try {
      const response = await fetch(this.serverVar.urlServer + '/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });
      
    } catch (error) {
      console.error('Error al crear el producto:', error);
      
    }
  }
}
