import { Component, effect, inject, signal } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  providers: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  headerService = inject(HeaderService);
  claseAplicada = signal('claseAplicada');
  tituloMostrado = signal('');

  esconderTitulo = effect(() => {
    if(this.headerService.titulo()){
      this.claseAplicada.set('fade-out');
    }
  }, {allowSignalWrites: true});

  mostrarTituloNuevo(e: AnimationEvent){
    if(e.animationName.includes("fade-out")){
      this.tituloMostrado.set(this.headerService.titulo());
      this.claseAplicada.set('fade-in');
      setTimeout(() => {
        this.claseAplicada.set('');
      }, 250);
    }
  }
}
