import { TypeFilter, TypeSearch } from "../search-card.model";

export const fieldData: TypeSearch[] = [
  {
    text: 'name',
    value: 'name',
    type: TypeFilter.STRING,
  },
  {
    text: 'phone',
    value: 'phone',
    type: TypeFilter.PHONE,
  },
  {
    text: 'documentId',
    value: 'cedula',
    type: TypeFilter.NUMERIC,
    minlength: 8,
  },
  {
    text: 'unit',
    value: 'unit',
    type: TypeFilter.NUMERIC,
    maxlength: 4,
  },
  { text: 'email', value: 'email', type: TypeFilter.EMAIL },
  {
    text: 'state',
    value: 'state',
    type: TypeFilter.SELECT,
    state_list: [
      {
        name: 'incontactable',
        value: 'INCONTACTABLE',
      },
      {
        name: 'future champion',
        value: 'FUTURE_CHAMPION',
      },
      {
        name: 'potential champion',
        value: 'POTENCIAL_CHAMPION',
      },
      {
        name: 'unqualified',
        value: 'UNQUALIFIED',
      },
      {
        name: 'potential customer',
        value: 'POTENCIAL_CUSTOMER',
      },
    ],
  },
];
