import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  logged: boolean = false;

  constructor(private authService: AuthService, private router: Router, private hotelService: HotelService) { }

  ngOnInit() {}

  logout() {
    this.authService.logout().then(
      () => location.reload()
    );
  }

  addHotel() { 

    this.router.navigateByUrl('/create-hotel');
    
  }
}
