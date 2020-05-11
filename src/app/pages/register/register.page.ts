import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import { HotelService } from 'src/app/services/hotel.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {nombre: '', apellidos: '', nombreUsuario: ''};
  email: string;
  password: string;

  constructor(private authService: AuthService,
    private router: Router, private hotelService: HotelService) { }

  ngOnInit() {
  }

  addUser() { 
    
      this.hotelService.addUser(this.user); 
  }

  
  createUser() {
    this.authService.createUser(this.email, this.password)
      .then(() => this.router.navigateByUrl('/list'));
    this.addUser();

      
  }
}
