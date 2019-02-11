import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public myProducts: Product[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  public getProducts(): Observable<Product[]> {
    this.http.get<Product[]>(this.baseUrl + 'api/ProductCatalog/GetUserProducts').subscribe(result => {
      this.myProducts = result;

    }, error => console.error(error));
    return of(this.myProducts);
  }
  public setProducts(products: Product[]): void {
    this.myProducts = products;
  }
  public resetProducts(): void {
    this.http.delete<Product[]>(this.baseUrl + 'api/ProductCatalog/DeleteAllProducts').subscribe(result => {
      this.myProducts = result;
    }, error => { console.log(error) });
  }
}
export interface Product {
  name: string;
  quantity: number;
  description: string;
}
