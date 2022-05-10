import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from '../../../environments/environment';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../helpers/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tft-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: Array<string> | undefined;
  dataSource!: MatTableDataSource<Product>;
  filterChangeSubscription: Subscription | undefined;
  loaded: boolean = false;
  pageSize: number = environment.pageSize;

  constructor(
    private productsService: ProductsService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.productsService.init();
    this.loaded = true;

    this.displayedColumns = this.productsService.columns;

    this.setData(this.productsService.filteredProducts);
    this.filterChangeSubscription = this.productsService.filterChange.subscribe(() => {
      this.setData(this.productsService.filteredProducts);
    });
  }

  ngOnDestroy(): void {
    this.filterChangeSubscription?.unsubscribe();
  }

  private setData(products: Array<Product> | undefined): void {
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
