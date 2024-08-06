import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Producto_model } from '../../interfaces/productos';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.css'
})
export class TarjetaProductoComponent {

@Input({required: true}) producto!:Producto_model

}
