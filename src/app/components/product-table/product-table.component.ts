import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from '../../../environments/environment';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../helpers/products';

@Component({
  selector: 'tft-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: Array<string> | undefined;
  dataSource!: MatTableDataSource<Product>;
  pageSize: number = environment.pageSize;

  constructor(
    private productsService: ProductsService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.productsService.init();

    this.dataSource = new MatTableDataSource(this.productsService.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.displayedColumns = this.productsService.columns;
  }
}
