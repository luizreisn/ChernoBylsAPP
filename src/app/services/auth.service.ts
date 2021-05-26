import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  public login(usuario: Usuario) {
    return this.afa.signInWithEmailAndPassword(usuario.email, usuario.senha);
  }

  public cadastrar(usuario: Usuario) {
    return this.afa.createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  public sair() {

  }

  public getAuth() {

  }
}
