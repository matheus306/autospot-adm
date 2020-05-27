import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Modelo } from '@app/_models'
import { Marca } from '@app/_models'
import { environment } from '@environments/index'

@Injectable({providedIn: 'root'})
export class ModeloService {

  constructor(private http : HttpClient) { }

  recuperaModeloPelaMarca(marca: Marca) {
    return this.http.get<Modelo[]>(`${environment.apiUrl}/api/v1/modelo/find-by-marca/${marca.Value}`);
  }
}
