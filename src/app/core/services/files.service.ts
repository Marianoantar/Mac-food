import { HttpClientModule } from '@angular/common/http';  
import { inject, Injectable } from '@angular/core';
import { ServerVarService } from './server-var.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  serverVar = inject(ServerVarService);
  // private http = inject (HttpClient);

  private baseURL = this.serverVar.urlServer + '/files/uploads';

  constructor() { }

  async upload(formData: FormData): Promise<any> {
      // return this.http.post<FormData>(this.baseURL, formData);
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: formData,
      });

      if (!response.ok) {
      throw new Error('Error al subir el archivo');
    }

    return response.json();
  }

  async uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(this.baseURL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al subir el archivo');
    }

    return response.json();
  }

}
