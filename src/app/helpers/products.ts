export interface Product {
  [field: string]: string;
}

export interface ProductsResponse {
  [id: string]: Product;
}
