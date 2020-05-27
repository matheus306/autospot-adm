import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { environment } from '@environments/environment';

import { AnoModelo, Modelo, Link } from '@app/_models'
import { ModeloAutospotDTO } from '@app/_dto'

@Injectable({ providedIn: 'root'})
export class AnoModeloService {

  constructor(private http : HttpClient) { }

  findByModelo(modelo : Modelo) {
    return this.http.get<AnoModelo[]>(`${environment.apiUrl}/api/v1/ano-modelo/findby/modelo/${modelo.Value}`);
  }

  filtrarPorPalavraChave(palavra : String) {
    return this.http.get<ModeloAutospotDTO[]>(`${environment.apiUrl}/api/autospot/filtrar-carros/${palavra}`);
  }

  recuperarReportagens(modeloDTO : ModeloAutospotDTO) {
    return this.http.get<Link[]>(`${environment.apiUrl}/api/v1/modelo-reportagem/findByAnoModelo/${modeloDTO.codigo}`);
  }
}
