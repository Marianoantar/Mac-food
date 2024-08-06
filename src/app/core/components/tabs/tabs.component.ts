import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TabsService } from '../../services/tabs.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnDestroy{

  // seleccion = signal('ninguno');
  tabsService = inject(TabsService);
  colorDesactivado = "#555555";
  colorActivado = "#000000";


  constructor(public router: Router){
    
  }

  ngOnDestroy(): void {
  }

  navegar(direccion: string) {
    this.tabsService.seleccion.set(direccion);
    // Cambiar de pagina
    this.router.navigate([direccion]);
  }

}
