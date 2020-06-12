import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }



  public addUser(user: User): Promise<DocumentReference> {
    return this.db.collection<User>('users').add(user);
  }

  public getUsers(): Observable<User[]> {
    return this.db.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const userId = a.payload.doc.id;
        return { userId, ...data };
      }))
    );
  }
}
