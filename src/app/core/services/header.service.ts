import { Inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  titulo = signal('');
  extendido = signal(false);

  constructor() { }
}
