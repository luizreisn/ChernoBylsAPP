import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Produto } from '../interfaces/produto';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage {

  public produtosFavoritos: string[];

  public quantidadeFavoritos: number;

  public usuario: Usuario = null;
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  public produtos = new Array<Produto>();
  public produtosFiltrados = this.produtos;
  private produtosSubscription: Subscription;

  constructor(private authService: AuthService,
              private produtosService: ProdutoService,
              private toastCtrl: ToastController) { 
    this.carregarUsuarios();
  }

  public async carregarUsuarios(){
    this.usuarioId = (await this.authService.getAuth().currentUser).uid 
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
      this.produtosFavoritos = this.usuario.produtosFavoritos;
      this.quantidadeFavoritos = this.produtosFavoritos.length;
    });
    this.produtosSubscription = this.produtosService.getProdutos().subscribe(data =>{
      this.produtos = data;
    });
  }

  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe();
    this.produtosSubscription.unsubscribe();
  }

  public filtrarFavoritos(){
    const p = this.produtos.filter(p => this.usuario.produtosFavoritos.includes(p.id));
    return p;
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

  async toast(message: string){
    const toast = await this.toastCtrl.create({ message, duration: 2000, color: 'primary'});
    toast.present();
  }

}
