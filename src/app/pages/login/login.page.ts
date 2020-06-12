import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { first } from 'rxjs/operators'; 
import { AuthService } from 'src/app/services/auth.service'; 
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  spinner: boolean = false;
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async login() {
    this.spinner = true;
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('/list');
    } catch (error) {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Conexión fallida',
      subHeader: 'No se ha podido acceder a la cuenta.',
      message: 'El correo electrónico y la contraseña proporcionados no son válidos.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
