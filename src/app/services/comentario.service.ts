import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comentario } from '../model/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  id: string;

  constructor(private db: AngularFirestore) { }

  public addComentario(comentario: Comentario): Promise<DocumentReference> {
    return this.db.collection<Comentario>('comentarios').add(comentario);
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
