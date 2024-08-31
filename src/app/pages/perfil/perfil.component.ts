import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
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

    const nombre=this.perfil.nombre.toLowerCase();
    const direccion=this.perfil.direccion.toLowerCase();
    if(nombre === 'admin' && direccion === 'admin'){
      this.perfilService.entrandoAdmin.set(true);


    } else this.perfilService.entrandoAdmin.set(false);
  }

  guardarDatosPerfil() {
    this.tabsService.seleccion.set('carrito');
    this.perfilService.guardarDatosPerfil(this.perfil);
    if(this.perfilService.admin()) this.router.navigate(['/admin'])
      else this.router.navigate(['/carrito']);
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
