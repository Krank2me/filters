import { Component } from '@angular/core';
import { TypeFilter, TypeSearch } from './search-card/search-card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'filters';
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
        'Incontactable',
        'Future Champion',
        'Potential Champion',
        'Unqualified',
        'Potential Customer',
      ],
    },
  ];

  getQuery(text: any) {
    this.fetching = true;
    setTimeout(() => {
      this.fetching = false;
    }, 2000);
  }
}
