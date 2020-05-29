import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ItemSerie } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemSerieService {

  constructor(private http : HttpClient) {}

  findAll() {
    return this.http.get<ItemSerie[]>(`${environment.apiUrl}/api/v1/item-de-serie/`);
  }

  excluir (id : number) {
    return this.http.delete<ItemSerie[]>(`${environment.apiUrl}/api/v1/item-de-serie/${id}`);
  }

  salvar (item : ItemSerie) {
    return this.http.post(`${environment.apiUrl}/api/v1/item-de-serie/`, item);
  }
}
