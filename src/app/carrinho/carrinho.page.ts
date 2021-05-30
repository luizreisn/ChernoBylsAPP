import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from '../interfaces/produto';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage {

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

  public filtrarCarrinho(){
    const p = this.produtos.filter(p => this.usuario.carrinho.find(p.id));
    return p;
  }

  public excluirDoCarrinho(produto: Produto){
    if(this.usuario.carrinho.find(p => p === produto.id)){
      const index = this.usuario.carrinho.findIndex(p => p === produto.id);
      this.usuario.carrinho.splice(index, 1);
      this.authService.atualizarCarrinho(this.usuarioId, this.usuario)
    }
  }

}
