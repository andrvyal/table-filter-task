import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Filter } from 'src/app/helpers/filters';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'tft-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {

  filterChangeSubscription: Subscription | undefined;
  filters: Array<Filter> = [];

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.filterChangeSubscription = this.productsService.filterChange.subscribe((filters: Array<Filter>) => {
      this.filters = filters.reverse();
    });
  }

  ngOnDestroy(): void {
    this.filterChangeSubscription?.unsubscribe();
  }

  removeFilter(reversedIndex: number): void {
    const index: number = this.filters.length - 1 - reversedIndex;
    this.productsService.removeFilter(index);
  }
}
