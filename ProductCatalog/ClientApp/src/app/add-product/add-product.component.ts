import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product-service/product-service.service';
import { Product } from '../product-service/product-service.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'add-product-component',
  templateUrl: './add-product.component.html',
  providers: [HomeComponent]
})
export class AddProductComponent {
  public product = {} as Product;
  public addProductResult: AddProductResult;
  private http: HttpClient;
  private baseUrl: string;
  public alerts = {
    success: false,
    error: false,
  };
  public invalidName: boolean;


  constructor(public ps: ProductService, http1: HttpClient, @Inject('BASE_URL') baseUrl1: string, private homeComp: HomeComponent) {
    this.resetForm();
    this.http = http1;
    this.baseUrl = baseUrl1;
    this.invalidName = false;
  }
  public checkValidName() {
    this.invalidName = (this.product.name == null || this.product.name.trim() === '');
  }
  public onSubmit() {
    this.addProduct();
  }
  public closeAlert(type: string) {
    if (type == 'success')
      this.alerts.success = false;
    if (type == 'error')
      this.alerts.error = false;
  }
  private resetForm() {
    this.product.name = '';
    this.product.description = '';
    this.product.quantity = 0;
  }
  private addProduct() {
    console.log("adding prodcut");
    this.product.name = this.product.name.trim();
    this.product.description = this.product.description.trim();
    var body = JSON.stringify(this.product);
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.alerts.success = false;
    this.alerts.error = false;
    this.invalidName = false;
    this.checkValidName();
    if (this.invalidName) {
      return;
    }
    this.http.post<AddProductResult>((this.baseUrl + 'api/ProductCatalog/AddProduct'), body, options).subscribe(result => {
      console.log(result);
      this.addProductResult = result;
      this.homeComp.ngOnInit();
      if (result.success) {
        this.alerts.success = true;
        this.resetForm();
      }
      else {
        this.alerts.error = true;
      }
    }
      , error => {
        console.log(error)
        this.alerts.error = true;
        this.addProductResult = {} as AddProductResult;
        this.addProductResult.success = false;
        this.addProductResult.message = "Failed to get data. Error Code: " + error.status;
      });

  }


}

interface AddProductResult {
  success: boolean;
  message: string;
  products: Product[]
}
