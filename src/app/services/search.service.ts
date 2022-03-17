import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeSearch } from '../search-card/search-card.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getList() {
    const url = '';
    return this.http.get<TypeSearch>(url);
  }

  getListByFilter(key: string) {
    return of([
      'carlos',
      'juan',
      'camilo',
      'manuel'
    ])
  }
}
