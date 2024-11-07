import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerVarService {

  urlLocalServer = 'http://localhost:3000'; // URL del server
  // urlServer = this.urlLocalServer;
  urlServer = 'https://rapidfood-back.mantar.uno'; // URL del server (ONRENDER)

  constructor() { }
}
