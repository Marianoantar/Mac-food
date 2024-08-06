import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PerfilModel } from '../../core/interfaces/perfil';
import { PerfilService } from '../../core/services/perfil.service';
import { Router } from '@angular/router';
import { TabsService } from '../../core/services/tabs.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  perfilService = inject(PerfilService);
  router = inject(Router);
  tabsService = inject(TabsService);

  perfil:PerfilModel = {
    nombre: '',
    direccion: '',
    telefono: '',
    detalleEntrga: ''
  }
  
  
  constructor() { 
  };
  headerService = inject(HeaderService)
  
  ngOnInit(): void {
    this.headerService.titulo.set ('Perfil');
    this.tabsService.seleccion.set('perfil');
    if(this.perfilService.perfil()){
      this.perfil = this.perfilService.perfil()!;
    }

  }

  guardarDatosPerfil() {
    this.perfilService.guardarDatosPerfil(this.perfil);
    this.tabsService.seleccion.set('carrito');
    this.router.navigate(['/carrito']);
  }

  borrar() {
    this.perfil = {
      nombre: '',
      direccion: '',
      telefono: '',
      detalleEntrga: ''
    }
    this.perfilService.borrarDatosPefil();
  }


}
