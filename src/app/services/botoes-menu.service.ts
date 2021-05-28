import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Avisos, BotoesMenu, BotoesMenuEsp } from '../interfaces/botoes-menu';

@Injectable({
  providedIn: 'root'
})
export class BotoesMenuService {

  private botoesMenuColecao: AngularFirestoreCollection<BotoesMenu>;
  private botoesMenusEspColecao: AngularFirestoreCollection<BotoesMenuEsp>;
  private avisosColecao: AngularFirestoreCollection<Avisos>;

  constructor(private afs: AngularFirestore) {
    this.botoesMenuColecao = this.afs.collection<BotoesMenu>('BotoesMenu');
    this.botoesMenusEspColecao = this.afs.collection<BotoesMenuEsp>('BotoesMenuEsp');
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

  public getBotoesMenuEsp() {
    return this.botoesMenusEspColecao.snapshotChanges().pipe(
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
