import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
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

  @Output() onQuery = new EventEmitter<string>();

  @ViewChild('matSelect', { static: false }) matSelect!: MatSelect;

  filterForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  fieldsSelected!: TypeSearch;
  filterSelected = '';
  stateSelected: string = '';
  statelist = [];
  listFilters = [];
  maxlength!: number;
  minlength!: number;
  min!: number;
  max!: number;
  private _called: any = null;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      query: new FormControl('', [
        Validators.minLength(1),
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('fields' in changes && this.fields) {
    }
  }

  get controlQuery() {
    return this.filterForm.controls['query'];
  }

  get isSelect() {
    return this.fieldsSelected?.type === TypeFilter.SELECT;
  }

  get showSearch() {
    return !this.fetching && !this.controlQuery?.value;
  }

  get showClose() {
    return !this.fetching && this.controlQuery?.value;
  }

  setQuery() {
    if (!this.controlQuery.valid || !this.fieldsSelected) {
      return;
    }
    if (this._called) {
      clearTimeout(this._called);
    }
    this._called = setTimeout(() => {
      this.onQuery.emit(this.controlQuery.value);
    }, 600);
  }

  onKeyUp(event: any) {
    if (
      (this.fieldsSelected?.type === TypeFilter.NUMERIC ||
        this.fieldsSelected?.type === TypeFilter.PHONE) &&
      !/^[0-9]$/.test(event.value)
    ) {
      let regex = /\d+/g;
      let value = regex.exec(event.value);
      let newValue = value ? value[0] : '';
      this.controlQuery.setValue(newValue);
    }
    this.setQuery();
  }

  onChangeState() {
    this.setQuery();
  }

  onChange(matSelectChange: MatSelectChange) {
    this.controlQuery.reset();
    this.fieldsSelected = this.fields.find(
      (field) => field.value === matSelectChange.value
    ) as TypeSearch;
    this.setValidators();
  }

  search() {}

  clean() {
    this.controlQuery.reset();
    if (this.matSelect) {
      setTimeout(() => this.matSelect.close());
    }
  }

  setValidators() {
    this.controlQuery.clearValidators();
    this.controlQuery.updateValueAndValidity();
    this.controlQuery.addValidators([
      Validators.minLength(1),
      Validators.required,
    ]);

    if (this.fieldsSelected?.regex) {
      this.controlQuery.addValidators([
        Validators.pattern(this.fieldsSelected?.regex),
      ]);
    }

    if (this.fieldsSelected?.type === TypeFilter.PHONE) {
      this.maxlength = 10;
      this.minlength = 10;
      this.controlQuery.addValidators([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]{10}$/),
      ]);
    }

    if (this.fieldsSelected?.type === TypeFilter.NUMERIC) {
      this.controlQuery.addValidators([Validators.pattern(/\d+/)]);
    }

    if (this.fieldsSelected?.type === TypeFilter.EMAIL) {
      this.controlQuery.addValidators([
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
