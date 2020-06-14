
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  recuperarTotalMarcas() {
    return this.http.get<number>(`${environment.apiUrl}/api/v1/dashboard/total-marcas`);
  }

  recuperarTotalModelos() {
    return this.http.get<number>(`${environment.apiUrl}/api/v1/dashboard/total-modelos`);
  }

  recuperarTotalVersoes() {
    return this.http.get<number>(`${environment.apiUrl}/api/v1/dashboard/total-versoes`);
  }

  recuperarTotalListasAutospot() {
    return this.http.get<number>(`${environment.apiUrl}/api/v1/dashboard/total-listas-autospot`);
  }
}
