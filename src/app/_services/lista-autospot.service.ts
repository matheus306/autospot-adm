import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { ListaAutospot } from '@app/_models';
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ListaAutospotService {

  constructor(private http : HttpClient) { }

  findByAno(ano : number) {
    return this.http.get<ListaAutospot>(`${environment.apiUrl}/api/v1/lista-auto-spot/ano/${ano}`);
  }
}
