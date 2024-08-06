import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  seleccion = signal('ninguno');
  
  constructor() { }
}
