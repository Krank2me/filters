import { Component } from '@angular/core';
import { TypeFilter } from './search-card/search-card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'filters';
  fetching = false;

  fields = [
    {
      text: 'Name',
      value: 'name',
      type: TypeFilter.STRING,
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
}
