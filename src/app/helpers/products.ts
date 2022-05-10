export interface Product {
  [field: string]: string | number;
}

export interface ProductsResponse {
  [id: string]: Product;
}
