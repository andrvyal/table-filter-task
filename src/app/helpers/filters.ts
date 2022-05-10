export enum FilterOperator {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  GREATER_OR_EQUAL = 'GREATER_OR_EQUAL',
  LESS_OR_EQUAL = 'LESS_OR_EQUAL',
  CONTAIN = 'CONTAIN',
  NOT_CONTAIN = 'NOT_CONTAIN',
}

export function getOperators(): Array<FilterOperator> {
  const operators: Array<FilterOperator> = Object.values(FilterOperator);
  return operators;
}

export interface Filter {
  column: string;
  operator: FilterOperator;
  value: string;
}
