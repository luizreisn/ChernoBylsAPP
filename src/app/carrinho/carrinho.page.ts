import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Produto } from '../interfaces/produto';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';
import firebase from "firebase/app"

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage{

  public subtotal: number = 0;
  public frete: number = 5;
  public total: number = 0;
  public id: string;

  public quantidadeCarrinho: number;

  public carrinho: Produto[];

  public usuario: Usuario = {};
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  constructor(private authService: AuthService,
              private navCtrl: NavController,) { 
    this.carregarDados();
  }

  public async carregarDados(){
    this.usuarioId = (await this.authService.getAuth().currentUser).uid 
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
      this.carrinho = this.usuario.carrinho;
      this.quantidadeCarrinho = this.carrinho.length;
      this.resetarValores()
      this.atualizarValor()
    });
  }

  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe();
  }

  public filtrar(produto: Produto){
    const c = produto.condimentos.filter(c => c.marcado === true)
    return c;
  }

  public excluirDoCarrinho(produto: Produto){
    const index = this.carrinho.findIndex(p => p === produto)
    this.carrinho.splice(index, 1);
    this.authService.atualizarCarrinho(this.usuarioId, this.carrinho);
    this.atualizarValor()
  }

  public atualizarValor(){
    for(let produto of this.carrinho){
      this.subtotal += produto.valorTotal
    }
    this.total = this.frete + this.subtotal;
  }

  public fazerPedido(){
    this.id = 'pedido' + Math.max(this.usuario.pedido.length + 1)
    //this.usuario.pedido.push({produtos: this.carrinho,subtotal: this.subtotal,frete: this.frete,total: this.total,data: new Date,id: this.id})
    this.usuario.pedido.unshift({produtos: this.carrinho,subtotal: this.subtotal,frete: this.frete,total: this.total,data: firebase.firestore.Timestamp.now(),id: this.id})
    this.usuario.carrinho = []
    this.authService.atualizarPedidos(this.usuarioId, this.usuario)
    this.authService.atualizarCarrinho(this.usuarioId, this.usuario.carrinho)
    this.resetarValores();
    this.navCtrl.navigateBack('/home');
    console.log(this.usuario.pedido)
  }

  public resetarValores(){
    this.subtotal = 0;
    this.total = 0;
  }

}
