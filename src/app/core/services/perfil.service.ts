import { Injectable, signal, WritableSignal } from '@angular/core';
import { PerfilModel } from '../interfaces/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  

  perfil:WritableSignal<PerfilModel | undefined> = signal(undefined);
  admin:WritableSignal<boolean> = signal(false);

  constructor() { 
    const perfilLocasStorage = localStorage.getItem('perfil');
    if(perfilLocasStorage) this.perfil.set(JSON.parse(perfilLocasStorage)) ;
  }

  guardarDatosPerfil(perfil: PerfilModel){
    localStorage.setItem('perfil', JSON.stringify(perfil));
    this.perfil.set(perfil);
    // corrobora sii es admin
    if(perfil.nombre === 'admin' && perfil.direccion === 'admin'){
      localStorage.setItem('token', 'true');
      this.admin.set(true); // Signal admin si usuario es administrador
    } else{
      localStorage.removeItem('token');
    }
  }
  
  borrarDatosPefil(){
    localStorage.removeItem('perfil');
    this.perfil.set(undefined);
    localStorage.removeItem('token');
  }

}
