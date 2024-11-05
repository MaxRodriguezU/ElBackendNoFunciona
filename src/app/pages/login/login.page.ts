import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  loginError: string | null = null;

  constructor(
    private authService: AuthService, 
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Guardar el token en localStorage
        this.authService.saveToken(response.accessToken);
        // Navegar a la página principal
        this.navCtrl.navigateRoot('/home');
      },
      (error) => {
        // Mostrar mensaje de error en caso de fallo
        this.loginError = 'Usuario o contraseña incorrectos.';
      }
    );
  }

}
