import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MyErrorStateMatcher } from '../utilities/ErrorStateMatcher';
import { TypeFilter, TypeSearch } from './search-card.model';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss'],
})
export class SearchCardComponent implements OnInit, OnChanges {
  @Input() fields: TypeSearch[] = [];
  @Input() fetching = false;

  filterForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  // email = new FormControl('', [Validators.email]);
  customControl = new FormControl('', []);
  fieldsSelected!: TypeSearch;
  filterSelected = '';
  stateSelected: string = '';
  statelist = [];
  listFilters = [];
  maxlength!: number;
  minlength!: number;
  min!: number;
  max!: number;

  constructor(public fb: FormBuilder) {
    this.filterForm = new FormGroup({});
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('fields' in changes && this.fields) {
    }
  }

  get isSelect() {
    return this.fieldsSelected?.type === TypeFilter.SELECT;
  }

  get showSearch() {
    return !this.fetching && !this.customControl?.value;
  }

  get showClose() {
    return !this.fetching && this.customControl?.value;
  }

  get typeControl() {
    switch (this.fieldsSelected?.type) {
      case TypeFilter.EMAIL:
        return 'email';
      case TypeFilter.NUMERIC:
      case TypeFilter.PHONE:
        return 'number';
      default:
        return 'text';
    }
  }

  onChange(matSelectChange: MatSelectChange) {
    this.fieldsSelected = this.fields.find(
      (field) => field.value === matSelectChange.value
    ) as TypeSearch;
    this.setValidators();
  }

  search() {}

  clean() {
    this.customControl.reset();
  }

  setValidators() {
    this.customControl.setValidators([Validators.required]);

    if (this.fieldsSelected?.regex) {
      this.customControl.setValidators([
        Validators.pattern(this.fieldsSelected?.regex),
      ]);
    }

    if (this.fieldsSelected?.type === TypeFilter.PHONE) {
      this.maxlength = 10;
      this.minlength = 10;
      this.customControl.setValidators([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$'),
      ]);
    }

    if (this.fieldsSelected?.type === TypeFilter.EMAIL) {
      this.customControl.setValidators([
        Validators.email,
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]);
    }

    this.maxlength =
      typeof this.fieldsSelected.max_length === 'number'
        ? this.fieldsSelected.max_length
        : this.maxlength;
    this.minlength =
      typeof this.fieldsSelected.min_length === 'number'
        ? this.fieldsSelected.min_length
        : this.minlength;
    this.min =
      typeof this.fieldsSelected.min === 'number'
        ? this.fieldsSelected.min
        : this.min;
    this.max =
      typeof this.fieldsSelected.max === 'number'
        ? this.fieldsSelected.max
        : this.max;
  }
}
