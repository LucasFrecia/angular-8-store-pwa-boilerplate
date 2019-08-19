import { FormState } from '@core/models/form-state.model';

export interface TransportSelectorStateModel {
  items: TransportItemModel[];
  originalItems: TransportItemModel[];
  filterCombos: FilterCombo;
  filterCombosOriginalCopy: FilterCombo;
  form: FormState<Partial<FormData>>;
}

export interface TransportItemModel {
  id: number;
  type: string;
  brand: string;
  colors: string[];
  img: string;
}

export interface FilterCombo {
  types: string[];
  colors: string[];
  brands: string[];
}

export interface FormData {
  type: string;
  color: string;
  brand: string;
}
