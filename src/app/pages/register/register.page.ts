import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  spinner: boolean = false;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  user: User = {nombre: '', apellidos: '', nombreUsuario: ''};
  email: string;
  password: string;
  userId: string;
  password2: string = "";

  constructor(private authService: AuthService,
    private router: Router, private userService: UserService, private hotelService: HotelService ) {

      
     }

  ngOnInit() {
  }

  togglePassword() {
    if(this.passwordShown) {
      this.passwordShown=false;
      this.passwordType = 'password';
    } else {
      this.passwordShown=true;
      this.passwordType = 'text';

    }
  }

  addUser() { 
    
      this.hotelService.addUser(this.user); 
  }

  
  createUser() {
    this.spinner = true;
    this.authService.createUser(this.email, this.password)
      .then(() => this.router.navigateByUrl('/list'));
    

    this.addUser();

      
  }
}
