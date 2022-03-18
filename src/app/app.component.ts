import { Component } from '@angular/core';
import { TypeFilter, TypeSearch } from './search-card/search-card.model';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'filters';
  query = '';
  fetching = false;

  fields: TypeSearch[] = [
    {
      text: 'Name',
      value: 'name',
      type: TypeFilter.STRING,
    },
    {
      text: 'Solo valor kleisman',
      value: 'kleisman',
      type: TypeFilter.STRING,
      regex: /^kleisman$/,
    },
    {
      text: 'Phone',
      value: 'phone',
      type: TypeFilter.PHONE,
    },
    {
      text: 'Cédula',
      value: 'cedula',
      type: TypeFilter.NUMERIC,
      minlength: 8,
    },
    {
      text: 'Edad',
      value: 'edad',
      type: TypeFilter.NUMERIC,
      min: 18,
      max: 60,
    },
    {
      text: 'Unit',
      value: 'unit',
      type: TypeFilter.NUMERIC,
      maxlength: 4,
    },
    { text: 'Email', value: 'email', type: TypeFilter.EMAIL },
    {
      text: 'State',
      value: 'state',
      type: TypeFilter.SELECT,
      state_list: [
        {
          name: 'Incontactable',
          value: 'INCONTACTABLE'
        },
        {
          name: 'Future Champion',
          value: 'FUTURE_CHAMPION'
        },
        {
          name: 'Potential Champion',
          value: 'POTENCIAL_CHAMPION'
        },
        {
          name: 'Unqualified',
          value: 'UNQUALIFIED'
        },
        {
          name: 'Potential Customer',
          value: 'POTENCIAL_CUSTOMER'
        }
      ],
    },
  ];

  constructor(public searchService: SearchService) {}

  getQuery(query: any) {
    this.query = query;
    this.fetching = true;
    this.searchService.getListByFilter(query).subscribe((res) => {
      setTimeout(() => {
        this.fetching = false;
      }, 2000);
    });
  }
}
