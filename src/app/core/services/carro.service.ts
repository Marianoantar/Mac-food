import { Inject, Injectable, OnInit } from '@angular/core';
import { Carro_model } from '../interfaces/carro';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CarroService implements OnInit{

  // configService = Inject(ConfigService);


  carrito: Carro_model[] = [];
  

    
  constructor(private configService: ConfigService) {
    const carritoStorage = localStorage.getItem('carrito');
    if(carritoStorage){
      const carritoGuardado = JSON.parse(carritoStorage) ;
      if(carritoGuardado){
        const fechaGuardada = new Date(carritoGuardado.fecha);
        const fecha = new Date();
        const dias = this.configService.configuracion().DIAS_VENCIMIENTO_CARRITO ; // dias de vencimiento del carrito
        // diferencia en dia
        const diferencia =  fecha.getTime() - fechaGuardada.getTime();
        // si la diferencia es mayor al numero de dias de vencimiento
        if(diferencia > (1000*60*60*24*dias)) this.vaciar() 
        else {this.carrito = carritoGuardado.productos
        }
      }
    } 
  }

  ngOnInit(): void {
    
  }
    
    agregarProducto(idProducto:number, cantidad:number, notas:string) {
      const i = this.carrito.findIndex(producto => producto.idProducto === idProducto);
      if(i === -1) {
        const nuevoProducto:Carro_model = {idProducto: idProducto , cantidad:cantidad, notas:notas};
        this.carrito.push(nuevoProducto);
      } else {
        this.carrito[i].cantidad += cantidad;
      }
      this.actualizarAlmacenamiento();
  
    }
  

  eliminarProducto(idProducto:number){
    this.carrito = this.carrito.filter(producto => producto.idProducto !== idProducto);
    if(this.carrito.length === 0) return localStorage.removeItem('carrito');
    this.actualizarAlmacenamiento();
  }

  cambiarCantidadProduct(idProducto:number, cantidad:number){
    this.carrito = this.carrito.map(producto => {
      const productoActual = producto;
      if (productoActual.idProducto === idProducto) productoActual.cantidad = cantidad;
      return productoActual;
    })
    this.actualizarAlmacenamiento();
  }

  actualizarAlmacenamiento(){
    const fecha = new Date();
    const elementoAGuardar = {
      fecha,
      productos: this.carrito
    }
    localStorage.setItem('carrito', JSON.stringify(elementoAGuardar));

  }

  vaciar(){
    this.carrito = [];
    localStorage.removeItem('carrito');
  }

}
