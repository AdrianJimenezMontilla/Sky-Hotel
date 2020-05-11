import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../model/hotel';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private db: AngularFirestore) { }

  public addHotel(hotel: Hotel): Promise<DocumentReference> {
    return this.db.collection<Hotel>('hotels').add(hotel);
  }

  public addUser(user: User): Promise<DocumentReference> {
    return this.db.collection<User>('users').add(user);
  }


  public getHotels(): Observable<Hotel[]> {
    return this.db.collection('hotels').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Hotel;
        const hotelId = a.payload.doc.id;
        return { hotelId, ...data };
      }))
    );
  }

  public deleteHotelById(id: string): Promise<void> {
    return this.db.collection('hotels').doc(id).delete();
  }

  public updateHotelById(id: string, hotel: Hotel): Promise<void> {
    return this.db.collection('hotels').doc(id).set(hotel);
  }

  public getHotelById(id: string): Observable<Hotel> {
    return this.db.collection('hotels').doc<Hotel>(id).valueChanges();
  }
}
