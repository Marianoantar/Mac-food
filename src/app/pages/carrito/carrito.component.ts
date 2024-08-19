import { Component, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CarroService } from '../../core/services/carro.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from '../../core/components/contador-cantidad/contador-cantidad.component';
import { Producto_model } from '../../core/interfaces/productos';
import { ProductosService } from '../../core/services/productos.service';
import { Router, RouterModule } from '@angular/router';
import { PerfilService } from '../../core/services/perfil.service';
import { TabsService } from '../../core/services/tabs.service';
import { NUMERO_WHATSAPP } from '../../core/constantes/telefono';
import { ConfigService } from '../../core/services/config.service';
import { environments } from '../../../environments/environments';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent, RouterModule ],
  providers: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{

  headerService = inject(HeaderService)
  carroService = inject(CarroService);
  productosService = inject(ProductosService);
  perfilService = inject(PerfilService);
  tabsService = inject(TabsService);
  router = inject(Router);
  configService = inject(ConfigService);

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  productosCarrito:WritableSignal <Producto_model[]> = signal([]);

  subtotal = 0;
  total = 0;

  constructor(){
  }
  
  ngOnInit(): void {
    this.tabsService.seleccion.set('carrito');
    this.headerService.titulo.set ('Carrito');
    if(localStorage.getItem('token')) this.perfilService.admin.set(true);
    this.buscarInformacion().then(() => this.calcularInformacion());
  }
  
  async buscarInformacion(){
    for(let i = 0; i < this.carroService.carrito.length; i++) {
      const itemCarrito = this.carroService.carrito[i];
      const res = await this.productosService.getById(itemCarrito.idProducto);
      if (res) this.productosCarrito.set([...this.productosCarrito(),res]);
    }


    this.carroService.carrito.forEach(async itemCarrito => {
    })

  }

  eliminarProducto(idProducto:number):void {
    this.carroService.eliminarProducto(idProducto);
    this.calcularInformacion();
  }

  calcularInformacion(){
    // this.delivery = this.configService.configuracion().costoEnvio;
    this.subtotal = 0;
    for (let i = 0; i < this.productosCarrito().length; i++) {
      const element = this.carroService.carrito[i];
      this.subtotal += this.productosCarrito()[i].precio * element.cantidad;
    }
    this.total = this.subtotal + this.configService.configuracion().costoEnvio;
  }

  cambiarCantidadProducto(id:number, cantidad:number){
    this.carroService.cambiarCantidadProduct(id, cantidad );
    this.calcularInformacion();
  }

  async enviarMensaje(){
    let pedido = '';
    for (let i = 0; i < this.carroService.carrito.length; i++) {
      const producto = await this.productosService.getById(this.carroService.carrito[i].idProducto);
      pedido += `*${this.carroService.carrito[i].cantidad} X ${producto?.nombre}\n`;
    }
    const mensaje = `
Hola! Soy ${this.perfilService.perfil()?.nombre}, y te quiero hacer el siguiente pedido:
${pedido}
Si te queres comunicar conmigo hacelo al numero ${this.perfilService.perfil()?.telefono}
La direccion de envío es ${this.perfilService.perfil()?.direccion} - ${this.perfilService.perfil()?.detalleEntrga}
Muchas gracias!!!
    `
    // const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURI(mensaje)}`;
    const link = `https://wa.me/${environments.NUMERO_WHATSAPP}?text=${encodeURI(mensaje)}`;
    window.open(link, '_blank');
    this.dialog.nativeElement.showModal();
  }

  finalizarPedido(){
    this.dialog.nativeElement.close();
    this.carroService.vaciar();
    this.tabsService.seleccion.set('');
    this.router.navigate(['/']);
  }

  editarPedido(){
    this.dialog.nativeElement.close();
  }


}
