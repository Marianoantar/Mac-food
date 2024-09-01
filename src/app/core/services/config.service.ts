import { Injectable, signal, WritableSignal } from '@angular/core';
import { ConfigModel } from '../interfaces/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configuracion: WritableSignal<ConfigModel> = signal({
    COSTO_ENVIO: 0,
    DIAS_VENCIMIENTO_CARRITO: 30,
    NUMERO_WHATSAPP: 5555555555,
    CLAVE_ADMIN: "12345"
  })

  constructor() {
    // leer archivo de configuracion
    this.leerConfiguracion()
   }


   async leerConfiguracion(): Promise<ConfigModel> {
    try {
      // fetch('http://localhost:3001/config').then(res => {
      fetch('https://backend-rapid-food.onrender.com/config').then(res => {
        return res.json()
      })
      . then(resJson =>{
          this.configuracion.set(resJson);
          return (resJson)
        })
    } catch (error) {
      console.error("Error al leer el archivo de configuracion: " + error);
      return this.configuracion();
    }
    return this.configuracion();
   }

   async guardarConfiguracion(configuracion: ConfigModel) {
    try {
      const response = await fetch('https://backend-rapid-food.onrender.com/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(configuracion)
      });
  
      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
      }
    } catch (error) {
      if (error instanceof ErrorEvent) {
        // Error del lado del cliente
        console.error('Error del cliente:', error.error.message);
      } else {
        // Error del lado del servidor
        console.error(`Error del servidor: ${error}`, error);
      }
      throw error;    }
  }
}
