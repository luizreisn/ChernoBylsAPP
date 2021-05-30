import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private colecaoProdutos: AngularFirestoreCollection<Produto>;

  constructor(private afs: AngularFirestore) { 
    this.colecaoProdutos = this.afs.collection<Produto>('Produtos');
  }

  public getProdutos(){
    return this.colecaoProdutos.snapshotChanges().pipe(
      map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      })
    )
  }

  public getProduto(id: string){
    return this.colecaoProdutos.doc<Produto>(id).valueChanges();
  }

}
