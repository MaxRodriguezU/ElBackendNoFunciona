import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  products: any[] = [];
  skip: number = 0;
  total: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(event?: any) {
    this.productService.getProducts(this.skip).subscribe(
      (response) => {
        this.products = [...this.products, ...response.products];
        this.total = response.total;
        this.skip += response.limit;

        if (event) {
          event.target.complete();
        }

        // Si se han cargado todos los productos, desactivar infinite scroll
        if (this.products.length >= this.total && event && event.target) {
          event.target.disabled = true;
        }
      },
      (error) => {
        console.error('Error al cargar productos', error);
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  loadMore(event: any) {
    this.loadProducts(event);
  }

}
