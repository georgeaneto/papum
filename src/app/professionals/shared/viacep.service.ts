import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IViaCEP } from './viacep.model';

@Injectable({
    providedIn: 'root'
})
export class ViaCEPService {
    private endpoint = 'https://viacep.com.br/ws/';

    constructor(private httpClient: HttpClient) { }

    public get(cep: string): Observable<IViaCEP> {
        return this.httpClient.get<IViaCEP>(`${ this.endpoint }/${ cep }/json`).pipe();
    }
}
