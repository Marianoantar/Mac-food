import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { TabsService } from '../../core/services/tabs.service';
import { ProductosService } from '../../core/services/productos.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Producto_model } from '../../core/interfaces/productos';
import { CommonModule } from '@angular/common';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';
import { CategoriasService } from '../../core/services/categorias.service';
import { PerfilService } from '../../core/services/perfil.service';

@Component({
  selector: 'app-rubro',
  standalone: true,
  imports: [CommonModule, TarjetaProductoComponent, RouterModule],
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.css'
})
export class RubroComponent {

  private headerService = inject(HeaderService);
  private tabsService = inject(TabsService);
  private categoriasService = inject(CategoriasService);
  private activatedRoute = inject(ActivatedRoute);
  public perfilService = inject(PerfilService);

  public id: number = 0;
  public productos:WritableSignal<Producto_model[]> = signal ([]);
  public ProductoNuevo: Producto_model;

  constructor(){
    this.ProductoNuevo = {
      id: 0,
      nombre: 'AGREGAR PRODUCTO',
      precio: 0,
      esVegano: false,
      esCeliaco: false,
      ingredientes: '',
      fotoUrl: './assets/img/signo-interrogacion.avif'
    };
  }
  
  ngOnInit(): void {
    this.tabsService.seleccion.set ('Ninguno');
    
    // recuperar parametro id
    this.activatedRoute.params.subscribe(params => {
      
      if(params['id']){
        this.id = parseInt(params['id']);
        // conseguir los productos de la categoria id
        this.categoriasService.getById(this.id)
        .then(categoria => {
          if(categoria) {
            this.productos.set(categoria?.productos);
            this.headerService.titulo.set (categoria.nombre);
          }
        })}
    });
    
  }

}
