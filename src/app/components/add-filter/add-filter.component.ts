import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'tft-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.scss']
})
export class AddFilterComponent implements OnInit {

  columns: Array<string> | undefined;

  constructor(
    private productsService: ProductsService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.productsService.init();
    this.columns = this.productsService.columns;
  }
}
