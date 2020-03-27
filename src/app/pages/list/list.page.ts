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
  constructor(private hotelService: HotelService) { this.hotels = this.hotelService.getHotels(); }
  ngOnInit() { }
  addHotel() { const hotel = { nombre: 'Posadas España', tipo: '4 Estrellas', descripcion: 'Hotel en el PTA', 
   imageUrl: 'https://q-cf.bstatic.com/images/hotel/max1024x768/134/13410696.jpg',
   ubicacion: 'Campanillas, Malaga', telefono: '952434543', precio:'50' }
  this.hotelService.addHotel(hotel);}
  }
