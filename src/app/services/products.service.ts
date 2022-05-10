import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { Product, ProductsResponse } from '../helpers/products';
import { Filter, FilterOperator } from '../helpers/filters';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private filterSubject: Subject<void> = new Subject();
  private filters: Array<Filter> = [];
  private initPromise: Promise<void> | undefined;
  private products: Array<Product> | undefined;

  constructor(
    private apiService: ApiService,
  ) { }

  addFilter(filter: Filter): void {
    this.filters.push(filter);
    this.filterSubject.next();
  }

  get columns(): Array<string> | undefined {
    return this.products && Object.keys(this.products[0]);
  }

  get filterChange(): Observable<void> {
    return this.filterSubject.asObservable();
  }

  async init(): Promise<void> {
    this.initPromise = this.initPromise || this.retrieveProducts();
    await this.initPromise;
  }

  private filter(product: Product): boolean {
    for (const filter of this.filters) {
      switch (filter.operator) {
        case FilterOperator.EQUAL: {
          if (product[filter.column] != filter.value) { // allow type conversion
            return false;
          }

          break;
        }

        case FilterOperator.NOT_EQUAL: {
          if (product[filter.column] == filter.value) { // allow type conversion
            return false;
          }

          break;
        }

        case FilterOperator.GREATER_OR_EQUAL: {
          if (product[filter.column] < filter.value) {
            return false;
          }

          break;
        }

        case FilterOperator.LESS_OR_EQUAL: {
          if (product[filter.column] > filter.value) {
            return false;
          }

          break;
        }

        case FilterOperator.CONTAIN: {
          const productValue: string = String(product[filter.column]).toLocaleLowerCase();
          const filterValue: string = String(filter.value).toLocaleLowerCase();
          const contains: boolean = productValue.indexOf(filterValue) >= 0;

          if (!contains) {
            return false;
          }

          break;
        }

        case FilterOperator.NOT_CONTAIN: {
          const productValue: string = String(product[filter.column]).toLocaleLowerCase();
          const filterValue: string = String(filter.value).toLocaleLowerCase();
          const contains: boolean = productValue.indexOf(filterValue) >= 0;

          if (contains) {
            return false;
          }

          break;
        }
      }
    }

    return true;
  }

  get filteredProducts(): Array<Product> | undefined {
    if (!this.products) {
      return;
    }

    return this.products.filter((product: Product): boolean => {
      return this.filter(product);
    });
  }

  removeFilter(index: number): void {
    this.filters.splice(index, 1);
    this.filterSubject.next();
  }

  private async retrieveProducts(): Promise<void> {
    const productsResponse: ProductsResponse = await this.apiService.get<ProductsResponse>(
      environment.apiUrl,
    );

    this.products = Object.values(productsResponse);
  }
}
