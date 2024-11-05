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
  loginError: string | null = null;
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
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(
        (response) => {
          this.authService.saveToken(response.accessToken);
          this.isLoading = false;
          this.navCtrl.navigateRoot('/home'); // Redirigir al usuario a la página principal
        },
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
