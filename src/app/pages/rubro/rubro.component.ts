import { Component, ElementRef, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { TabsService } from '../../core/services/tabs.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Producto_model } from '../../core/interfaces/productos';
import { CommonModule } from '@angular/common';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';
import { CategoriasService } from '../../core/services/categorias.service';
import { PerfilService } from '../../core/services/perfil.service';
import { EdicionProductoService } from '../../core/services/edicion-producto.service';

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
  public edicionPrService = inject(EdicionProductoService);
  private router = inject(Router);

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  public id_rubro: number = 0;
  public id_producto: number = 0;
  public productoNuevo: Producto_model;

  constructor(){
    this.productoNuevo = {
      id: 0,
      nombre: 'AGREGAR PRODUCTO',
      precio: 0,
      esVegano: false,
      esCeliaco: false,
      ingredientes: [],
      fotoUrl: './assets/img/signo-interrogacion.avif'
    };
  }
  
  ngOnInit(): void {
    this.tabsService.seleccion.set ('Ninguno');
    if(localStorage.getItem('token')){
      this.perfilService.admin.set(true);
    }
    // recuperar parametro id
    this.activatedRoute.params.subscribe(params => {
      
      if(params['id']){
        this.id_rubro = parseInt(params['id']);
        // conseguir los productos de la categoria id
        this.categoriasService.getById(this.id_rubro)
        .then(categoria => {
          if(categoria) {
            // carga señal rubro() con la categoria leida
            this.edicionPrService.rubro.set(categoria);
            this.headerService.titulo.set (categoria.nombre);
          }
        })}
    });
    
  }

  
  eliminarProducto(id_producto: number) {
    this.id_producto = id_producto;
    this.dialog.nativeElement.showModal();
  }

  eliminarProductoDefinitivo(id_producto: number) {
    this.dialog.nativeElement.close();
    this.edicionPrService.delete(id_producto);
  }
  
  cancelarEliminado(){
    this.dialog.nativeElement.close();
  }

  editarProducto(id_producto:number, id_rubro:number) {
    
    this.router.navigate(['/editarProducto', id_producto, id_rubro]);
  }

}
