import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment'
import { FichaTecnica } from './../_models/ficha-tecnica';

@Injectable({
  providedIn: 'root'
})
export class FichaTecnicaService {

  constructor(private http : HttpClient) { }

  init() {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/ficha-tecnica/init`);
  }

  findByAnoModelo(id: number) {
    return this.http.get<FichaTecnica>(`${environment.apiUrl}/api/v1/ficha-tecnica/find/by/ano-modelo/${id}`);
  }

  salvar(fichaTecnica: FichaTecnica) {
    return this.http.post(`${environment.apiUrl}/api/v1/ficha-tecnica/`, fichaTecnica);
  }

  excluir (id : number) {
    return this.http.delete<FichaTecnica[]>(`${environment.apiUrl}/api/v1/ficha-tecnica/${id}`);
  }

  editar(fichaTecnica: FichaTecnica) {
    return this.http.post(`${environment.apiUrl}/api/v1/ficha-tecnica/`, fichaTecnica);
  }
}
