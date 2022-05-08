import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { Product, ProductsResponse } from '../helpers/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private initPromise: Promise<void> | undefined;
  private originalProducts: Array<Product> | undefined;

  constructor(
    private apiService: ApiService,
  ) { }

  async init(): Promise<void> {
    this.initPromise = this.initPromise || this.retrieveProducts();
    await this.initPromise;
  }

  get products(): Array<Product> {
    return JSON.parse(JSON.stringify(this.originalProducts));
  }

  private async retrieveProducts(): Promise<void> {
    const productsResponse: ProductsResponse = await this.apiService.get<ProductsResponse>(
      environment.apiUrl,
    );

    this.originalProducts = Object.values(productsResponse);
  }
}
