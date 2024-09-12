import { Component, inject, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { TabsService } from '../../core/services/tabs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { Producto_model } from '../../core/interfaces/productos';
import { ContadorCantidadComponent } from '../../core/components/contador-cantidad/contador-cantidad.component';
import { CarroService } from '../../core/services/carro.service';
import { FormsModule } from '@angular/forms';
import { PerfilService } from '../../core/services/perfil.service';

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [ContadorCantidadComponent, FormsModule],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent {

  headerService = inject(HeaderService);
  tabsService = inject(TabsService);
  productoService = inject(ProductosService);
  carroService = inject(CarroService);
  perfilService = inject(PerfilService);


  producto?:Producto_model;

  public id = 0;
  cantidad = signal(1);
  notas = '';

  constructor( private activatedRoute: ActivatedRoute, private router: Router){
    this.activatedRoute.params.subscribe(param => {
      if(param['id']){
        const id = Number(param['id']);

        this.productoService.getById(id) 
          .then(producto =>{
            this.producto = producto;
            this.headerService.titulo.set(producto!.nombre)
          })
  
  
      }
    })
  
  }
  
  
  ngOnInit(): void {
    this.headerService.titulo.set ('Articulo');
    this.tabsService.seleccion.set('ninguno');
    if(localStorage.getItem('token')) this.perfilService.admin.set(true);
  }

  agregarAlCarrito(){
    if(!this.producto) return;
    this.carroService.agregarProducto(this.producto?.id, this.cantidad(), this.notas);
    this.router.navigate(['/carrito']);
  }

}
