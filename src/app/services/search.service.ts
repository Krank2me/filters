import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Search } from '../search-card/search-card.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getList() {
    const url = '';
    return this.http.get<Search>(url);
  }

  getListByFilter(key: string) {
    const url = `localhost:8080/${key}`;
    return this.http.get<Search>(url);
  }
}