import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { PerfilModel } from '../interfaces/perfil';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  
  configService = inject(ConfigService)

  perfil:WritableSignal<PerfilModel | null> = signal({
    nombre: '',
    direccion: '',
    telefono: '',
    detalleEntrga: ''
  });
  hayPerfil:WritableSignal<boolean> = signal(false);
  admin:WritableSignal<boolean> = signal(false);
  entrandoAdmin:WritableSignal<boolean> = signal(false);


  constructor() { 
    const perfilLocasStorage = localStorage.getItem('perfil');
    if(perfilLocasStorage) {
      this.perfil.set(JSON.parse(perfilLocasStorage)) ;
      this.hayPerfil.set(true)
    }
  }

  guardarDatosPerfil(perfil: PerfilModel){
    // corrobora sii es admin
    if(this.estaEntrandoAdmin(perfil)){
      if(!this.codigoOk(perfil.telefono!)) {
        // NO es Admin. 
        this.borrarDatosPefil();
        this.admin.set(false);
        this.perfil.set(null);
        this.entrandoAdmin.set(false);
        localStorage.removeItem('token');
        alert('El codigo no es el correcto para entrar como Administrador');
        return;
      } else {
        // es Admin!!!}
        localStorage.setItem('token', 'true');
        this.admin.set(true); // Signal admin si usuario es administrador
        this.terminarGuardado(perfil);
        return;
      }
    } else {
      this.admin.set(false);
      this.entrandoAdmin.set(false);
      localStorage.removeItem('token');
      this.terminarGuardado(perfil);
    }
  }

  terminarGuardado(perfil: PerfilModel){
    localStorage.setItem('perfil', JSON.stringify(perfil));
    this.hayPerfil.set(true); // Signal hayPerfil si hay datos en el local storage
    this.perfil.set(perfil);
  }
  
  borrarDatosPefil(){
    localStorage.removeItem('perfil');
    localStorage.removeItem('token');
    this.hayPerfil.set(false);
    this.admin.set(false); // Signal admin si usuario es administrador
    this.perfil.set({
      nombre: '',
      direccion: '',
      telefono: '',
      detalleEntrga: ''
    });
  }


  codigoOk(telefono: string): boolean {
    if(telefono  === this.configService.configuracion().CLAVE_ADMIN){
      return true 
    } else {return false;}
  }

  estaEntrandoAdmin(perfil: PerfilModel): boolean {
    return (perfil.nombre.toLowerCase() === 'admin' && perfil.direccion.toLowerCase() === 'admin');
  }

}
