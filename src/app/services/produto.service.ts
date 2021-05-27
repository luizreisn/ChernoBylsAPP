import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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

  }

  public getProduto(id: string){

  }
}
