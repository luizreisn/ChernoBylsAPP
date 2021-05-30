import { Component } from '@angular/core';
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

  public usuario: Usuario = {};
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  public produtos = new Array<Produto>();
  public produtosFiltrados = this.produtos;
  private produtosSubscription: Subscription;

  constructor(private authService: AuthService,
              private produtosService: ProdutoService) { 
    this.carregarUsuarios();
  }

  public async carregarUsuarios(){
    this.usuarioId = (await this.authService.getAuth().currentUser).uid 
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
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

  public favoritar(produto: Produto){
    if(this.usuario.produtosFavoritos.find(p => p === produto.id)){
      const index = this.usuario.produtosFavoritos.findIndex(p => p === produto.id);
      this.usuario.produtosFavoritos.splice(index, 1);
      this.authService.atualizarFavorito(this.usuarioId, this.usuario)
    }else{
      this.usuario.produtosFavoritos.push(produto.id);
      this.authService.atualizarFavorito(this.usuarioId, this.usuario)
    }
  }

}
