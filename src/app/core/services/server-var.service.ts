import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerVarService {

  urlLocalServer = 'http://localhost:3000'; // URL del server
  urlServer = 'https://backend-rapid-food.onrender.com'; // URL del server (ONRENDER)

  constructor() { }
}
