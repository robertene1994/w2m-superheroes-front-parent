export enum FilterOperator {
  LOWER_THAN = 'LOWER_THAN',
  LOWER_THAN_OR_EQUAL = 'LOWER_THAN_OR_EQUAL',
  EQUAL = 'EQUAL',
  LIKE = 'LIKE',
  STARTS_WITH = 'STARTS_WITH',
  NOT_EQUAL = 'NOT_EQUAL',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  IS_NULL = 'IS_NULL',
}

export class Condition {
  field!: string;
  operator!: FilterOperator;
  value!: any;
}
