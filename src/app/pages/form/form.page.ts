import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/model/hotel';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  hotel: Hotel = {nombre: '', tipo: '', descripcion: '', imageUrl: '', ubicacion: '', telefono: '', precio: ''};
  pageTitle: string = 'Nuevo hotel'; 
  action: string = 'create'; 
  id: string;
  cambio: number;


  constructor(private hotelService: HotelService, private router: Router, private activatedRoute: ActivatedRoute, private navCtrl: NavController ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id'); 
    if (this.id != null) {
      this.pageTitle = 'Información del hotel'; 
      this.action = 'edit'; 
      this.hotelService.getHotelById(this.id).subscribe( 
        data => this.hotel = data
      );
    }

  }

  addHotel() { 
    if (this.action === 'create') { 
      this.hotelService.addHotel(this.hotel); 
      
    } else { 
      this.hotelService.updateHotelById(this.id, this.hotel);
      
    }
    this.router.navigateByUrl('/list');
  }


}
