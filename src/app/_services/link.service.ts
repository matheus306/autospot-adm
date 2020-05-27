import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Link } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http : HttpClient) { }

  salvarLink( link : Link) {
    return this.http.post<Link>(`${environment.apiUrl}/api/v1/modelo-reportagem/`, link)
  }

  excluirLink( id : number) {
    let httpParams = new HttpParams().set('id', id.toString());
    let options = { params: httpParams };
    return this.http.delete<Link>(`${environment.apiUrl}/api/v1/modelo-reportagem/`, options) 
  }
}
