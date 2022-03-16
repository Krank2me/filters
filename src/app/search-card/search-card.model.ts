export interface TypeSearch {
  text?: string;
  value?: string;
  type?: TypeFilter;
  regex?: string | RegExp;
  max_length?: number;
  min_length?: number;
  min?: number;
  max?: number;
  state_list?: string[];
}

export enum TypeFilter {
  STRING = 'string',
  NUMERIC = 'numberic',
  EMAIL = 'email',
  SELECT = 'select',
  PHONE = 'phone',
}
