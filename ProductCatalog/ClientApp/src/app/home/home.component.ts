import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product-service/product-service.service';
import { Product } from '../product-service/product-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public products: Product[];
  interval: any;
  constructor(public ps: ProductService) { }
  public ngOnInit(): void {
    console.log("getting products");
    this.getProducts();
    this.interval = setInterval(() => {
      this.getProducts();
    }, 2000);
  }

  public getProducts(): void {
    this.ps.getProducts().subscribe(products => this.products = products);
  }
  public resetProducts(): void {
    this.ps.resetProducts();
    
  }
}


