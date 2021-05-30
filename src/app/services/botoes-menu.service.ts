import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Avisos, BotoesMenu } from '../interfaces/botoes-menu';

@Injectable({
  providedIn: 'root'
})
export class BotoesMenuService {

  private botoesMenuColecao: AngularFirestoreCollection<BotoesMenu>;
  private avisosColecao: AngularFirestoreCollection<Avisos>;

  constructor(private afs: AngularFirestore) {
    this.botoesMenuColecao = this.afs.collection<BotoesMenu>('BotoesMenu');
    this.avisosColecao = this.afs.collection<Avisos>('Avisos');
  }

  public getBotoesMenu() {
    return this.botoesMenuColecao.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public getAvisos() {
    return this.avisosColecao.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

}
