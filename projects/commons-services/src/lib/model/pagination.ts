import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

export class PaginationDataRequest {
  page!: number;
  pageSize!: number;
  sortFields!: string[];
  sortDir!: 'asc' | 'desc' | '';
  filter?: { [param: string]: string | string[] };

  toHttpParams(): HttpParams {
    let params = new HttpParams({ fromObject: this.filter });
    params = params.append('page', `${this.page}`);
    params = params.append('pageSize', `${this.pageSize}`);
    params = params.append('sortDir', `${this.sortDir}`.toUpperCase());
    this.sortFields.forEach((fieldName) => {
      params = params.append('sortFields', fieldName);
    });
    return params;
  }

  constructor(fields: Partial<PaginationDataRequest>) {
    Object.assign(this, fields);
  }
}

export class PageData<T> {
  content: T[];
  total: number;
  page_params!: {
    pageSize: number;
    page: number;
    sortDirection?: 'ASC' | 'DESC';
    sortFields?: string[];
  };

  constructor(content = [], total = 0) {
    this.content = content;
    this.total = total;
  }
}

export interface PaginationService<T> {
  getPage(pagRequest: PaginationDataRequest): Observable<PageData<T>>;
}
