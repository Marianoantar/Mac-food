import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { TabsService } from '../../core/services/tabs.service';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../core/services/config.service';
import { ConfigModel } from '../../core/interfaces/config';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../../core/services/perfil.service';

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
  configuracion:ConfigModel = this.configService.configuracion();
  cargando = signal(true)

  constructor() {
    // this.configuracion = this.configService.configuracion();
  }
  
   ngOnInit(): void {
    // await this.configService.leerConfiguracion().then(() => {
    //   this.configuracion = this.configService.configuracion();
    // });
    this.headerService.titulo.set ('Administrador');
    this.tabsService.seleccion.set('admin');
    if(localStorage.getItem('token')) this.perfilService.admin.set(true);
    this.cargando.set(false);
  }
  
  async loadConfiguracion(){
    await this.configService.leerConfiguracion();
    this.configuracion = this.configService.configuracion();
  }
  guardarConfiguracion(){
        // Suponiendo que tienes el objeto de configuración en una variable llamada 'configData'
        // const blob = new Blob([JSON.stringify(this.configuracion, null, 2)], { type: 'application/json' });
        // saveAs(blob, './../assets/data/configuracion.json');
  }

}
