# Aprender a encriptar clave 
 recomendaciones para mejorar la seguridad y la gestión de tu archivo:

    - Encriptar datos sensibles: La CLAVE_ADMIN no debería estar en texto plano. Considera usar un método de encriptación para proteger esta información.
    
    - Validar datos: Asegúrate de que los valores como NUMERO_WHATSAPP sean validados antes de ser utilizados en tu aplicación.
    
    - Separar configuraciones: Si tienes configuraciones que cambian entre entornos (desarrollo, producción), considera usar diferentes archivos de configuración o variables de entorno.

    ```const CryptoJS = require("crypto-js");

    const config = {
        "COSTO_ENVIO": 1000,
        "DIAS_VENCIMIENTO_CARRITO": 2,
        "NUMERO_WHATSAPP": 3415620901,
        "CLAVE_ADMIN": CryptoJS.AES.encrypt("12345", "tu-secreto").toString()
    };

    console.log(config);```

## Desencriptar

```const CryptoJS = require("crypto-js");

// Encriptar la clave
const claveEncriptada = CryptoJS.AES.encrypt("12345", "tu-secreto").toString();

// Desencriptar la clave
const bytes = CryptoJS.AES.decrypt(claveEncriptada, "tu-secreto");
const claveDesencriptada = bytes.toString(CryptoJS.enc.Utf8);

console.log("Clave encriptada:", claveEncriptada);
console.log("Clave desencriptada:", claveDesencriptada);```

# Archivos Json
## Leer archivos Json
1- Usando FETCH

```import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>{{ config | json }}</div>`
})
export class AppComponent implements OnInit {
  config: any;

  ngOnInit() {
    fetch('assets/configuracion.json')
      .then(response => response.json())
      .then(data => {
        this.config = data;
      });
  }
}import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>{{ config | json }}</div>`
})
export class AppComponent implements OnInit {
  config: any;

  ngOnInit() {
    fetch('assets/configuracion.json')
      .then(response => response.json())
      .then(data => {
        this.config = data;
      });
  }
}```

2- Usando IMPORT
Primero, habilita la opción resolveJsonModule en tu archivo tsconfig.json:

```{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}```

Luego importa el archivo JSON en tu componente:

```import { Component } from '@angular/core';
import * as config from '../assets/configuracion.json';

@Component({
  selector: 'app-root',
  template: `<div>{{ config | json }}</div>`
})
export class AppComponent {
  config: any = config;
}```


# Problema de Actualización en tu formulario Angular

Análisis del Problema:

Parece que estás enfrentando un problema de detección de cambios en Angular. Aunque estás actualizando el modelo de tu componente después de recibir los datos de la API, los cambios no se reflejan inmediatamente en el formulario. Esto suele ocurrir debido a las siguientes razones:

    Detección de Cambios: Angular utiliza un sistema de detección de cambios para actualizar la vista cuando los datos subyacentes cambian. Si Angular no detecta estos cambios, la vista no se actualizará.
    Asincronía: Las peticiones HTTP son asíncronas. Si estás actualizando el modelo después de que la petición se ha completado, pero antes de que Angular tenga la oportunidad de ejecutar la detección de cambios, los cambios podrían no ser reflejados inmediatamente.
    Envolturas de Control: Si estás utilizando envolturas de control personalizadas o bibliotecas de terceros, podrían estar interfiriendo con el proceso de detección de cambios.

Posibles Soluciones:

    Forzar la Detección de Cambios:

        ChangeDetectorRef: Inyecta ChangeDetectorRef en tu componente y llama a detectChanges() después de actualizar el modelo:
        TypeScript

        import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
        // ...
        constructor(private changeDetectorRef: ChangeDetectorRef) {}

        // ...
        leerConfiguracion() {
          this.configService.leerConfiguracion().subscribe(config => {
            this.configuracion = config;
            this.changeDetectorRef.detectChanges();
          });
        }

        Usa el código con precaución.

Utilizar markForCheck():

    Similar a detectChanges(), pero marca al componente y sus hijos para que sean revisados en la siguiente ronda de detección de cambios.

Observables y async pipe:

    Suscríbete al Observable que emite la configuración y utiliza el async pipe en la plantilla para que Angular se encargue automáticamente de la detección de cambios:
    TypeScript

    // En el servicio:
    configuracion$ = new BehaviorSubject<any>(null);

    // En el componente:
    configuracion$ = this.configService.configuracion$;

    Usa el código con precaución.

En la plantilla:
HTML

<input [(ngModel)]="configuracion$ | async" />

Usa el código con precaución.

    Revisar Envolturas de Control:
        Si estás utilizando envolturas de control personalizadas, asegúrate de que estén configuradas correctamente para detectar cambios.

    Considerar OnPush:
        Si estás utilizando ChangeDetectionStrategy.OnPush, asegúrate de que los cambios en los datos que se pasan al componente estén marcados como detectables. Esto podría implicar utilizar Immutable.js o emitir nuevos objetos en lugar de modificar los existentes.

Ejemplo con async pipe:
TypeScript

// config.service.ts
import { BehaviorSubject } from 'rxjs';
// ...
configuracion$ = new BehaviorSubject<any>(null);

leerConfiguracion() {
  // ...
  this.configuracion$.next(config);
}

// admin.component.ts
import { Component } from '@angular/core';
// ...
configuracion$ = this.configService.configuracion$;

Usa el código con precaución.

¿Cuál es la mejor opción?

La mejor opción dependerá de tu caso específico y de la complejidad de tu aplicación. En general, el async pipe es una buena opción para manejar datos asíncronos en las plantillas de Angular. Si tienes problemas más específicos, puedes considerar otras soluciones.





