import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../utilities/ErrorStateMatcher';
import { Search } from './search-card.model';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  filterForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  email = new FormControl('', [Validators.email]);
  filterSelected: string = 'name'
  stateSelected: string = ''
  selectList: Search[] = [
    {key: 'name', value: 'Name'},
    {key: 'phone', value: 'Phone'},
    {key: 'email', value: 'Email'},
    {key: 'state', value: 'State'}
  ];
  statelist = ['Incontactable', 'Future Champion', 'Potential Champion', 'Unqualified', 'Potential Customer']

  constructor() { }

  ngOnInit(): void {
  }




}
