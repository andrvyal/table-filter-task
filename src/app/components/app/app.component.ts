import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'tft-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.productsService.init();
  }
}
