import { Component, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { EdicionProductoService } from '../../core/services/edicion-producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../core/services/header.service';
import { Producto_model } from '../../core/interfaces/productos';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edicion-producto',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './edicion-producto.component.html',
  styleUrl: './edicion-producto.component.css'
})
export class EdicionProductoComponent implements OnInit {

  public errorId: WritableSignal<boolean> = signal(false)
  public idExiste: WritableSignal<boolean> = signal(false)

  // productForm: FormGroup ;
  
  public edicionPrService = inject(EdicionProductoService);
  private headerService = inject(HeaderService);
  private route = inject(ActivatedRoute);
  router = inject(Router);
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  
  public id_producto:number = 0;
  public id_rubro:number = 0;
  public productos: Producto_model[]; 
  public productoNuevo: Producto_model; 
  public producto: Producto_model; 
  //  * "rubro" es un signal que contiene toda la informacion del rubro o categria y tambien contiene a 'porductos'
  // *  "productos" es el array donde pertenece 'producto'
  // * "producto"  es el objeto a editar

  constructor(private formBuilder: FormBuilder) {
    // * Inicializacion de variables y objetos
    this.productoNuevo = {
      id: 0,
      nombre: 'Producto nuevo',
      precio: 0,
      esVegano: false,
      esCeliaco: false,
      ingredientes: '',
      fotoUrl: './assets/img/signo-interrogacion.avif'
    };
    this.producto = this.productoNuevo;
    this.productos = this.edicionPrService.rubro().productos; 
    // console.log(this.productos);


    // * RECUPERA PARAMETROS
    this.route.params.subscribe(param => {
      
      if(param){
        this.id_producto = Number(param['id_producto']);
        this.id_rubro = Number(param['id_rubro']);

        // ? ES PRODUCTO NUEVO O EDICION???
        if (this.id_producto === 0) {
          // PRODUCTO NUEVO
          this.headerService.titulo.set ('Producto nuevo');
        } else {
          //  EDICION
          this.headerService.titulo.set ('Edición de producto');
          //  Cargar this.producto con los datos del producto a modificar
          const busqueda = this.productos.find(producto => producto.id === this.id_producto)
          if (busqueda) this.producto = busqueda;
          //* REDUCIR EL ID de producto para luego volverlo a incrementar
          //* de esta manera queda solamente un numero del 1 al 99
          this.producto.id = this.producto.id - (this.id_rubro * 100);

        }
      };
    }
    );
  }

  ngOnInit(): void {  }

  confirmGuardarDatos(){
    // * Chequea ID
    this.idExiste.set(false);
    this.errorId.set(false);

    //*? ERROR ID???
    if (this.producto.id === null || isNaN(this.producto.id) || 
        this.producto.id > 99 || this.producto.id < 1 ) { 
          console.log("ERROR ID", this.producto.id)
      this.errorId.set(true); 
      return
    } else this.errorId.set(false);

    // * Convertir ID segun Rubro
    this.producto.id = this.id_rubro * 100 + this.producto.id;

    //? EXISTE ID???
    const idEncontrados = this.productos.filter(producto => producto.id == this.producto.id);
    if(this.id_producto===0 && idEncontrados.length >= 1) {
      this.idExiste.set(true); 
      return;      
    } else if(idEncontrados.length >= 2){
      this.idExiste.set(true);
      return;
    } else if(this.producto.id==0){
      this.errorId.set(true);
      return;
    }

    //* Confirmar Guardado
    this.dialog.nativeElement.showModal();

  }

  cancelGuardarDatos() {
    this.dialog.nativeElement.close();
    this.router.navigate(['/categoria', this.id_rubro]);  // Volver al Rubro
  }
  
  async guardarDatos() {
    this.dialog.nativeElement.close();

    //* Transfiere prooducto a productos
    if (this.id_producto === 0) {
      // Pproducto nuevo - Ejecuta Post 
      this.edicionPrService.post(this.producto);
      
    } else {
      // Producto actualiizado - Ejecuta Put
      this.edicionPrService.put(this.id_producto, this.producto);
    
    }
    // //* Actualizar Rubro
    await this.edicionPrService.actualizarRubro(this.id_rubro);

    // //* Volver al Rubro
    this.router.navigate(['/categoria', this.id_rubro]);
  }


}