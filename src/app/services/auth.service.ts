import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../interfaces/usuario';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData = this.afa.user.pipe(switchMap(u => this.afs.doc<Usuario>('Usuarios/'+u.uid).valueChanges()));
  public usuariosColecao: AngularFirestoreCollection<Usuario>;
  
  constructor(private afa: AngularFireAuth,
              private afs: AngularFirestore) { 
    this.usuariosColecao = this.afs.collection<Usuario>('Usuarios');
  }

  public login(usuario: Usuario) {
    return this.afa.signInWithEmailAndPassword(usuario.email, usuario.senha);
  }

  public cadastrar(usuario: Usuario) {
    return this.afa.createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  public atualizarUsuario(id: string, usuario: Usuario){
    return this.usuariosColecao.doc<Usuario>(id).update(usuario);
  }

  public atualizarFavorito(id: string, produtosFav: string[]){
    return this.usuariosColecao.doc<Usuario>(id).update({produtosFavoritos: produtosFav})
  }

  public atualizarCarrinho(id: string, produto: Produto[]){
    return this.usuariosColecao.doc<Usuario>(id).update({carrinho: produto})
  }

  public atualizarPedidos(id: string, usuario: Usuario){
    return this.usuariosColecao.doc<Usuario>(id).update({pedido: usuario.pedido})
  }

  public getUsuario(id: string){
    return this.usuariosColecao.doc<Usuario>(id).valueChanges();
  }

  public sair() {
    return this.afa.signOut();
  }

  public getAuth() {
    return this.afa;
  }
}
