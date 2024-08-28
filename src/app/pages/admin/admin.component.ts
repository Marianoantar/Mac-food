import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { TabsService } from '../../core/services/tabs.service';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../core/services/config.service';
import { ConfigModel } from '../../core/interfaces/config';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../../core/services/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  private headerService = inject(HeaderService);
  private tabsService = inject(TabsService);
  private configService = inject(ConfigService);
  private perfilService =inject(PerfilService);
  private router = inject(Router);
  configuracion:ConfigModel = this.configService.configuracion();
  cargando = signal(true)

  constructor() {
    // this.configuracion = this.configService.configuracion();
  }
  
   ngOnInit(): void {
    this.headerService.titulo.set ('Administrador');
    this.tabsService.seleccion.set('admin');
    if(localStorage.getItem('token')) this.perfilService.admin.set(true);
    this.cargando.set(false);
  }
  
  async loadConfiguracion(){
    await this.configService.leerConfiguracion().then(config => {
      this.configuracion = config;
    })
  }
  

  guardarConfiguracion(){
    this.configService.guardarConfiguracion(this.configuracion);
    console.log('configuracion guardada', this.configuracion);
    this.router.navigate(['/']);
  }

}
