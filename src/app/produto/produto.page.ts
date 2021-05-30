import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Produto } from '../interfaces/produto';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage{

  public quantidade: number = 0;

  public valorTotal: number = null;

  public produto: Produto = {};
  public produtoId: string = null;
  public produtoSubscription: Subscription;

  public usuario: Usuario = {};
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  constructor(private produtoService: ProdutoService,
              private authService: AuthService,
              private activeRoute: ActivatedRoute,
              private navCtrl: NavController) { 
    this.carregarDados();
  }

  public async carregarDados(){
    this.produtoId = this.activeRoute.snapshot.params['id'];
    this.produtoSubscription = this.produtoService.getProduto(this.produtoId).subscribe(data =>{
      this.produto = data;
    });
    this.usuarioId = (await this.authService.getAuth().currentUser).uid 
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
    });
    this.resetarProduto();
  }

  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe();
    this.produtoSubscription.unsubscribe();
  }

  public favoritar(produto: Produto){
    if(this.usuario.produtosFavoritos.find(p => p === produto.id)){
      const index = this.usuario.produtosFavoritos.findIndex(p => p === produto.id);
      this.usuario.produtosFavoritos.slice(index, 1);
      this.authService.atualizarFavorito(this.usuarioId, this.usuario)
    }else{
      this.usuario.produtosFavoritos.push(produto.id);
      this.authService.atualizarFavorito(this.usuarioId, this.usuario)
    }
  }

  public retirar(){
    if(this.quantidade <= 0){
      return;
    }else{
      this.quantidade--;
      this.atualizarValor();
    }
  }

  public adicionar(){
    this.quantidade++;
    this.atualizarValor();
  }

  public atualizarValor(){
    this.valorTotal = this.produto.valor * this.quantidade;
  }

  public adicionarProd(){
    console.log(this.valorTotal);
    console.log(this.usuario);
    this.resetarProduto();
    this.navCtrl.navigateBack('/home');
  }

  public resetarProduto(){
    this.quantidade = 0;
    this.atualizarValor();
    console.log(this.produto.condimentos);
  }

}
