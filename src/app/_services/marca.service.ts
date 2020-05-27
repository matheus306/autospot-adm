import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Marca } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class MarcaService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Marca[]>(`${environment.apiUrl}/api/v1/marca/`);
    }
}