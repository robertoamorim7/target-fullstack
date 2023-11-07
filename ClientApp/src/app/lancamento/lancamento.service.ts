import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../models/lancamento';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Filter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  private url = "Lancamento";

  constructor(private httpClient: HttpClient) { }


  public getAllLancamentos(filter: Filter): Observable<Lancamento[]> {
    let httpParams = new HttpParams();

    Object.keys(filter).forEach(function (key) {
      httpParams = httpParams.append(key, filter[key]);
    });

    return this.httpClient.get<Lancamento[]>(`${environment.apiUrl}/${this.url}`, { params: httpParams });
  }

  public getLancamentoById(id: string): Observable<Lancamento> {
    return this.httpClient.get<Lancamento>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public updateLancamento(lancamento: Lancamento) {
    return this.httpClient.put(`${environment.apiUrl}/${this.url}`, lancamento);
  }

  public deleteLancamentoById(id: string): Observable<any> { // TODO verificar ocmo tratar delete
    return this.httpClient.delete(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public createLancamento(lancamento: Lancamento) {
    return this.httpClient.post(`${environment.apiUrl}/${this.url}`, lancamento);
  }


}
