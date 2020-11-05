import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { ListaAutospot, ItemSerie } from '@app/_models';
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ListaAutospotService {

  constructor(private http : HttpClient) { }

  findByAno(ano : number) {
    return this.http.get<ListaAutospot>(`${environment.apiUrl}/api/v1/lista-auto-spot/ano/${ano}`);
  }

  isItemAssociadoModelo(ano : number, item : number) {
    return this.http.get<Boolean>(`${environment.apiUrl}/api/v1/lista-auto-spot/ano/${ano}/item/${item}`);
  }

  createLista(lista : ListaAutospot) {
    return this.http.post(`${environment.apiUrl}/api/v1/lista-auto-spot/`, lista);
  }
 
  updateLista(lista : ListaAutospot) {
    return this.http.put(`${environment.apiUrl}/api/v1/lista-auto-spot/`, lista);
  }

  mergeItensDoAnoItensDaLista(lista : ListaAutospot, todosItems : Array<ItemSerie>) {
    for (let item of todosItems) {
      if( lista && lista.itensDeSerie ) {
        item.checked = lista.itensDeSerie.find(obj => obj.id == item.id) != null;
      }
    }
  }
}
