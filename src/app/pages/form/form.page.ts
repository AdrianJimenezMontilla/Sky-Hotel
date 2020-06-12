import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/model/hotel';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Comentario } from 'src/app/model/comentario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  
  prueba = '';
  users: Observable<User[]>;
  userId: string;
  hotel: Hotel = {nombre: '', tipo: '', descripcion: '', imageUrl: '', ubicacion: '', telefono: '', precio: ''};
  pageTitle: string = 'Nuevo hotel'; 
  action: string = 'create'; 
  id: string;
  cambio: number;
  comentario: Comentario = {usuario: '', puntua: '', comenta: '', precioMedio: ''};
  comentarios: Observable<Comentario[]>;


  constructor(private hotelService: HotelService, private router: Router, private activatedRoute: ActivatedRoute, private navCtrl: NavController,
    private db: AngularFirestore, private authService: AuthService, private userService: UserService ) {

      this.authService.getCurrentUser().subscribe(
        data =>{this.userId = data.uid; console.log(data);}
 

      );
      this.users = this.hotelService.getUsers();

      
    

      
     }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id'); 
    if (this.id != null) {
      this.pageTitle = 'Información del hotel'; 
      this.action = 'edit'; 
      this.hotelService.getHotelById(this.id).subscribe( 
        data => this.hotel = data
      );
    
      this.comentarios = this.getComentarios(); 

      
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




  public addComentario(comentario: Comentario): Promise<DocumentReference> {
  
    return this.db.collection<Comentario>('comentarios/'+ this.id + '/hotels').add(this.comentario);
  }

  public getComentarios(): Observable<Comentario[]> {
    return this.db.collection('comentarios/' + this.id + '/hotels').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Comentario;
        const comentarioId = a.payload.doc.id;
        return { comentarioId, ...data };
      }))
    );
  }
  


}
