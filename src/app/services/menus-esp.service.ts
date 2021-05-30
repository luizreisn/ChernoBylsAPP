import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { MenuEspecifico } from '../interfaces/menu-especifico';

@Injectable({
  providedIn: 'root'
})
export class MenusEspService {

  private menusEspColecao: AngularFirestoreCollection<MenuEspecifico>;

  constructor(private afs: AngularFirestore) { 
    this.menusEspColecao = this.afs.collection<MenuEspecifico>('MenusEsp');
  }

  public getMenusEsp(){
    return this.menusEspColecao.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public getMenuEsp(id: string){
    return this.menusEspColecao.doc<MenuEspecifico>(id).valueChanges();
  }
}
