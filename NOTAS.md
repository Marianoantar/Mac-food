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








