import { Component, OnInit } from '@angular/core';
import { FilterOperator, getOperators } from 'src/app/helpers/filters';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'tft-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.scss']
})
export class AddFilterComponent implements OnInit {

  column: string | undefined;
  columns: Array<string> | undefined;
  FilterOperator: typeof FilterOperator = FilterOperator;
  operator: FilterOperator = FilterOperator.EQUAL;
  value: string = '';

  // operators: Array<FilterOperator> = getOperators();

  constructor(
    private productsService: ProductsService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.productsService.init();
    this.columns = this.productsService.columns;

    this.reset();
  }

  addFilter(): void {
    this.productsService.addFilter({
      column: this.column!,
      operator: this.operator,
      value: this.value,
    });

    this.reset();
  }

  private reset(): void {
    this.column = this.columns?.[0];
    this.operator = FilterOperator.EQUAL;
    this.value = '';
  }
}
