import { inject, Injectable } from '@angular/core';
import { ServerVarService } from './server-var.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  serverVar = inject(ServerVarService);
  // private http = inject (HttpClient);

  private postURL = this.serverVar.urlServer + '/files/upload';

  constructor() { }

  async uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(this.postURL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al subir el archivo');
    }

    return response.json();
  }

}
