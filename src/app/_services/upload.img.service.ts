import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/index'
import { AnoModelo, AmazonImage } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class UploadImgService {

  constructor(private http : HttpClient) { }

  upload(file: File, anoModelo : AnoModelo): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('imageFile', file);
    formData.append('anoModelo', anoModelo.id.toString());

    const req = new HttpRequest('POST', `${environment.apiUrl}/api/v1/img/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  excluir(id: number) {
    return this.http.delete<AmazonImage[]>(`${environment.apiUrl}/api/v1/img/${id}`);
  }

  setarImagemPrincipal(amazonImage : AmazonImage) {
    return this.http.put(`${environment.apiUrl}/api/v1/img/`, amazonImage);
  }
}
