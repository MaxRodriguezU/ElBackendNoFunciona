import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  products: Product[] = []; // Almacena la lista de productos obtenidos de la API
  skip: number = 30; // Controla el numero de productos ya cargados, usado para paginacion
  total: number = 0; // Almacena el total de productos disponibles en la API

  constructor(
    private productService: ProductService, // Servicio para obtener los productos de la API
    private authService: AuthService, // Servicio de Aunteticacion para el LogOut
    private navCtrl: NavController // Servicio de navegacion para redirigir a otras paginas
  ) { }

  ngOnInit() {
    this.loadProducts(); // Carga los primeros productos en la pagina
  }

  ionViewWillEnter() {
    // Resetear productos y skip al volver a la página
    // Esto asegura que se carguen los datos desde 0
    this.products = [];
    this.skip = 0; // Resetea el contador de productos cargados
    this.loadProducts(); // Carga la primera tanda de productos
  }

  loadProducts(event?: any) {
    this.productService.getProducts(this.skip).subscribe(
      // Manejo de respuesta en caso de ser Exitoso
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
      // Manejo de respuesta en caso de NO SER EXITOSO
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

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login'); // Redirigir al usuario a la página de login
  }

}
