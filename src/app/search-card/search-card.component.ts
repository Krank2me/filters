import {
  Component,
  EventEmitter,
  Input,
  Output,
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
import { TypeFilter, TypeSearch, QueryValue } from './search-card.model';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss'],
})
export class SearchCardComponent {
  @Input() fields: TypeSearch[] = [];
  @Input() fetching = false;

  @Output() onQuery = new EventEmitter<QueryValue>();

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
  min: number = 0;
  max!: number;
  private _called: any = null;
  private _onquery!: QueryValue;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      query: new FormControl(''),
    });
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
    if (this.controlQuery.valid || this.fieldsSelected) {
      this.sentEvent();
    }
  }

  sentEvent() {
    if (this._onquery?.value === this.controlQuery.value) {
      return;
    }
    if (this._called) {
      clearTimeout(this._called);
    }
    this._called = setTimeout(() => {
      const queryValue: QueryValue = {
        key: this.fieldsSelected.value,
        value: this.controlQuery.value,
      };
      this.onQuery.emit((this._onquery = queryValue));
    }, 600);
  }

  stop(e: any) {
    e.stopPropagation();
  }

  onInput(event: any) {
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
    this.sentEvent();
    this.setValidators();
  }

  clean() {
    this.controlQuery.reset();
    this.sentEvent();
    if (this.matSelect) {
      setTimeout(() => this.matSelect.close());
    }
  }

  getTextError() {
    let text = '';
    if (this.controlQuery.hasError('minlength')) {
      text = `Debe tener mínimo ${
        this.controlQuery.getError('minlength').requiredLength
      } carateres.`;
    }
    if (this.controlQuery.hasError('maxlength')) {
      text = `Debe tener máximo ${
        this.controlQuery.getError('maxlength').requiredLength
      } carateres.`;
    }
    if (this.controlQuery.hasError('min')) {
      text = `El valor debe ser mínimo de  ${
        this.controlQuery.getError('min').min
      }.`;
    }
    if (this.controlQuery.hasError('max')) {
      text = `El valor debe ser máximo de  ${
        this.controlQuery.getError('max').max
      }.`;
    }
    if (this.controlQuery.hasError('pattern')) {
      text = `Valor Inválido`;
    }
    return text;
  }

  setValidators() {
    this.min = 0;
    (this.max as any) = null;
    (this.maxlength as any) = null;
    (this.minlength as any) = null;
    this.controlQuery.clearValidators();
    this.controlQuery.addValidators([Validators.minLength(1)]);

    if (this.fieldsSelected?.regex) {
      this.controlQuery.addValidators([
        Validators.pattern(this.fieldsSelected?.regex),
      ]);
    }

    if (this.fieldsSelected?.type === TypeFilter.PHONE) {
      this.maxlength = 10;
      this.minlength = 10;
      this.controlQuery.addValidators([Validators.pattern(/\d+/)]);
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

    if (typeof this.fieldsSelected?.max === 'number') {
      this.max = this.fieldsSelected.max;
      this.controlQuery.addValidators([Validators.max(this.max)]);
    }
    this.min =
      typeof this.fieldsSelected?.min === 'number'
        ? this.fieldsSelected.min
        : this.min;
    if (typeof this.fieldsSelected?.min === 'number' || this.min) {
      this.controlQuery.addValidators([Validators.min(this.min)]);
    }
    this.minlength =
      typeof this.fieldsSelected?.minlength === 'number'
        ? this.fieldsSelected.minlength
        : this.minlength;
    if (typeof this.fieldsSelected?.minlength === 'number') {
      this.controlQuery.addValidators([Validators.minLength(this.minlength)]);
    }
    this.maxlength =
      typeof this.fieldsSelected?.maxlength === 'number'
        ? this.fieldsSelected.maxlength
        : this.maxlength;
    if (typeof this.fieldsSelected?.maxlength === 'number') {
      this.controlQuery.addValidators([Validators.maxLength(this.maxlength)]);
    }
    this.controlQuery.updateValueAndValidity();
  }
}
