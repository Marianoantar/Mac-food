import { Injectable, signal, WritableSignal } from '@angular/core';
import { PerfilModel } from '../interfaces/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  

  perfil:WritableSignal<PerfilModel | undefined> = signal(undefined);

  constructor() { 
    const perfilLocasStorage = localStorage.getItem('perfil');
    if(perfilLocasStorage) this.perfil.set(JSON.parse(perfilLocasStorage)) ;
  }

  guardarDatosPerfil(perfil: PerfilModel){
    localStorage.setItem('perfil', JSON.stringify(perfil));
    this.perfil.set(perfil);
  }

  borrarDatosPefil(){
    localStorage.removeItem('perfil');
    this.perfil.set(undefined);
  }

}
