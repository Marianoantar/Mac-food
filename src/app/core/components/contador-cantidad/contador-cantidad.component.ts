import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';

@Component({
  selector: 'app-contador-cantidad',
  standalone: true,
  imports: [],
  templateUrl: './contador-cantidad.component.html',
  styleUrl: './contador-cantidad.component.css'
})
export class ContadorCantidadComponent implements OnInit {
  
  contador = signal(1);
  @Output() contadorCambiado = new EventEmitter<number>(); 
  @Input() cantidadInicial = 1;

  constructor(){}

  ngOnInit(): void {
    this.contador.set(this.cantidadInicial)
  }

  actualizarContador(num: number){
    this.contador.set(this.contador() + num );
    if(this.contador() < 0){
      this.contador.set(0);
    }
    // emite evento con el numero del contador
    this.contadorCambiado.emit(this.contador());
  }

}
