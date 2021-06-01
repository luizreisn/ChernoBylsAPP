import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
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

  public produtosFavoritos: string[];

  public produto: Produto = {};
  public produtoId: string = null;
  public produtoSubscription: Subscription;

  public usuario: Usuario = {};
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  constructor(private produtoService: ProdutoService,
              private authService: AuthService,
              private activeRoute: ActivatedRoute,
              private navCtrl: NavController,
              private toastCtrl: ToastController) { 
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
      this.produtosFavoritos = this.usuario.produtosFavoritos
    });
    this.resetarProduto();
  }

  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe();
    this.produtoSubscription.unsubscribe();
  }

  public darFavorito(id: string){
    if(this.produtosFavoritos.find(p => p === id)){
      const index = this.produtosFavoritos.findIndex(p => p === id)
      this.produtosFavoritos.splice(index, 1)
      console.log(this.produtosFavoritos)
      this.authService.atualizarFavorito(this.usuarioId, this.produtosFavoritos)
      this.toast('Produto retirado da lista de favoritos.')
    }else{
      this.produtosFavoritos.push(id)
      console.log(this.produtosFavoritos)
      this.authService.atualizarFavorito(this.usuarioId, this.produtosFavoritos)
      this.toast('Produto colocado na lista de favoritos.')
    }
  }

  public retirar(){
    if(this.produto.quantidade <= 0){
      return;
    }else{
      this.produto.quantidade--;
      this.atualizarValor();
    }
  }

  public adicionar(){
    this.produto.quantidade++;
    this.atualizarValor();
  }

  public atualizarValor(){
    this.produto.valorTotal = this.produto.valor * this.produto.quantidade;
  }

  public async adicionarProd(){
    this.usuario.carrinho.push(this.produto)
    await this.authService.atualizarCarrinho(this.usuarioId, this.usuario.carrinho);
    console.log(this.produto.valorTotal);
    console.log(this.usuario);
    console.log(this.produto);
    this.resetarProduto();
    this.navCtrl.navigateBack('/carrinho');
  }

  public resetarProduto(){
    this.produto.quantidade = 0;
    this.atualizarValor();
    console.log(this.produto.condimentos);
  }

  async toast(message: string){
    const toast = await this.toastCtrl.create({ message, duration: 2000, color: 'primary'});
    toast.present();
  }

}
