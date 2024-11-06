import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loginError: string | null = null; // Guarda un mensaje temporal
  isLoading: boolean = false; 

  constructor(
    private authService: AuthService, 
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onLogin() {
    // Verifica si el formulario es válido
    if (this.loginForm.valid) {
      // Estado del proceso activo
      this.isLoading = true;
      // Extrae del formulario reactivo estos campos de username y password
      const { username, password } = this.loginForm.value;

      // Usa el servicio de Auth para realizar la autenticacion y navegar al home donde estan los productos
      this.authService.login(username, password).subscribe(

        // Manejo de respuestas en caso de tener exito
        (response) => {
          this.authService.saveToken(response.accessToken);
          this.isLoading = false;
          this.navCtrl.navigateRoot('/home'); // Redirigir al usuario a la página principal
        },
        // Manejo de respuestas en caso de NO TENER EXITO
        (error) => {
          this.isLoading = false;
          this.loginError = 'Usuario o contraseña incorrectos.';
        }
      );
    } else {
      this.loginError = 'Por favor, completa todos los campos.';
    }
  }
}
