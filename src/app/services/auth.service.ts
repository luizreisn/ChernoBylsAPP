import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../interfaces/usuario';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData = this.afa.user.pipe(switchMap(u => this.afs.doc<Usuario>('Usuarios/'+u.uid).valueChanges()));
  
  constructor(private afa: AngularFireAuth,
              private afs: AngularFirestore) { }

  public login(usuario: Usuario) {
    return this.afa.signInWithEmailAndPassword(usuario.email, usuario.senha);
  }

  public cadastrar(usuario: Usuario) {
    return this.afa.createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  public sair() {
    return this.afa.signOut();
  }

  public getAuth() {
    return this.afa;
  }
}
