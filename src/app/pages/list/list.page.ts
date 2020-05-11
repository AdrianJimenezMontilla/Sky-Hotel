import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/model/hotel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {



  hotels: Observable<Hotel[]>;


  constructor(private hotelService: HotelService, private router: Router,  ) { 
    
    this.hotels = this.hotelService.getHotels(); 
  
  }

  ngOnInit() { }


  addHotel() { 

    this.router.navigateByUrl('/create-hotel');
    
  }

  goEditHotel(id: string) {
    this.router.navigateByUrl('edit-hotel/' + id);

  }
}
