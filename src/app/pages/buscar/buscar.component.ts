import { Component, inject, NgModule, OnInit, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusquedaModel } from '../../core/interfaces/busqueda';
import { ProductosService } from '../../core/services/productos.service';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';
import { RouterModule } from '@angular/router';
import { Producto_model } from '../../core/interfaces/productos';
import { TabsService } from '../../core/services/tabs.service';
import { PerfilService } from '../../core/services/perfil.service';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, FormsModule, TarjetaProductoComponent, RouterModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit{
  
  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  tabsService = inject (TabsService);
  perfilService = inject (PerfilService);


  parametrosBusqueda:BusquedaModel = {
    texto: '',
    aptoCeliaco: false, 
    aptoVegano: false
  }
  productos:WritableSignal<Producto_model[]> = signal([]);
  cargando = signal(true);

  constructor() { };

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.perfilService.admin.set(true);
      this.headerService.titulo.set('Buscar / Editar');
    } else this.headerService.titulo.set ('Buscar');
    this.productosService.getAll().then (productos => this.productos.set(productos));
    this.tabsService.seleccion.set('buscar');
    this.cargando.set(false);    
  }

  async buscar(){
    this.cargando.set(true);
    const resultadoBusqueda = await this.productosService.buscar(this.parametrosBusqueda);
    this.productos.set(resultadoBusqueda);
    this.cargando.set(false);
  }

}
