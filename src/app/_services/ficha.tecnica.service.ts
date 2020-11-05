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
}
