import { Injectable } from '@angular/core';

import { Condition, FilterOperator } from './../model/filter';

/**
 * Servicio responsable de las operaciones relacionadas con los filtros
 * aplicados por el usuario.
 *
 * @author Robert Ene
 */
@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  toHttpParams(conditions: Condition[]): {
    [param: string]: string | string[];
  } {
    const params: { [param: string]: string | string[] } = {};
    conditions?.forEach((condition) => {
      if (condition.field && condition.operator && condition.value) {
        const convertedOperator = this.convertOperator(condition.operator);
        params[
          `cf_${condition.field}_${convertedOperator}`
        ] = `${condition.value}`;
      }
    });
    return params;
  }

  fromHttpParams(params: { [param: string]: string | string[] }): Condition[] {
    const conditions: Condition[] = [];
    if (params) {
      for (let filter in params) {
        if (filter.startsWith('cf_')) {
          let key = filter.split('_');
          conditions.push({
            field: key[1],
            operator: this.convertFromOperator(key[2]),
            value: params[filter],
          } as Condition);
        }
      }
    }
    return conditions;
  }

  private convertOperator(operador: string): string {
    if (operador) {
      switch (operador) {
        case FilterOperator.IN:
          return `in`;
        case FilterOperator.NOT_IN:
          return `notIn `;
        case FilterOperator.EQUAL:
          return `eq`;
        case FilterOperator.LIKE:
          return `like`;
        case FilterOperator.NOT_EQUAL:
          return 'neq';
        case FilterOperator.STARTS_WITH:
          return `start`;
        case FilterOperator.GREATER_THAN:
          return `gt`;
        case FilterOperator.GREATER_THAN_OR_EQUAL:
          return `gte`;
        case FilterOperator.LOWER_THAN_OR_EQUAL:
          return `lte`;
        case FilterOperator.LOWER_THAN:
          return `lt`;
        default:
          return `isNull`;
      }
    }
  }

  private convertFromOperator(operator: string): FilterOperator {
    if (operator) {
      switch (operator) {
        case 'in':
          return FilterOperator.IN;
        case 'notIn':
          return FilterOperator.NOT_IN;
        case 'eq':
          return FilterOperator.EQUAL;
        case 'like':
          return FilterOperator.LIKE;
        case 'neq':
          return FilterOperator.NOT_EQUAL;
        case 'start':
          return FilterOperator.STARTS_WITH;
        case 'gt':
          return FilterOperator.GREATER_THAN;
        case 'gte':
          return FilterOperator.GREATER_THAN_OR_EQUAL;
        case 'lte':
          return FilterOperator.LOWER_THAN_OR_EQUAL;
        case 'lt':
          return FilterOperator.LOWER_THAN;
        default:
          return FilterOperator.IS_NULL;
      }
    }
  }
}
