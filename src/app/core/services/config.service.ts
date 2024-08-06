import { Injectable, signal, WritableSignal } from '@angular/core';
import { ConfigModel } from '../interfaces/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configuracion: WritableSignal<ConfigModel> = signal({
    costoEnvio: 0,
    diasVencimientoCarrito: 30
  })

  constructor() {
    // leer archivo de configuracion
    this.leerConfiguracion()
   }


   async leerConfiguracion(){
    try {
      fetch("./../../assets/data/configuracion.json").then(res => {
        return res.json()
      })
      . then(resJson =>{
          this.configuracion.set(resJson)
        })
    } catch (error) {
      console.error("Error al leer el archivo de configuracion: " + error);
    }
   }

}
