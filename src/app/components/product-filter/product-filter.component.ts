import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Filter, FilterOperator } from '../../helpers/filters';

@Component({
  selector: 'tft-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  @Input() filter!: Filter;
  @Output() remove: EventEmitter<void> = new EventEmitter();

  FilterOperator: typeof FilterOperator = FilterOperator;

  constructor() { }

  ngOnInit(): void {
  }

  removeFilter(): void {
    this.remove.emit();
  }
}
