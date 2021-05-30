import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuEspecifico } from '../interfaces/menu-especifico';
import { Produto } from '../interfaces/produto';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';
import { MenusEspService } from '../services/menus-esp.service';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage {

  public menuEsp: MenuEspecifico = {};
  public menuEspId: string = null;
  public menuEspSubscription: Subscription;

  public produtos = new Array<Produto>();
  public produtosFiltrados = this.produtos;
  private produtosSubscription: Subscription;

  public usuario: Usuario = {};
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  constructor(private menusEspService: MenusEspService,
              private produtoService: ProdutoService,
              private authService: AuthService,
              private activeRoute: ActivatedRoute) { 
    this.carregarDados();
  }

  public async carregarDados(){
    this.menuEspId = this.activeRoute.snapshot.params['id'];
    this.produtosSubscription = this.produtoService.getProdutos().subscribe(data =>{
      this.produtos = data;
    });
    this.menuEspSubscription = this.menusEspService.getMenuEsp(this.menuEspId).subscribe(data =>{
      this.menuEsp = data;
    });
    this.usuarioId = (await this.authService.getAuth().currentUser).uid 
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
    });
  }

  ngOnDestroy(){
    this.produtosSubscription.unsubscribe();
    this.menuEspSubscription.unsubscribe();
    this.usuarioSubscription.unsubscribe();
  }

  public favoritar(id: string){
    if(this.usuario.produtosFavoritos.find(p => p === id)){
      const index = this.usuario.produtosFavoritos.findIndex(p => p === id);
      this.usuario.produtosFavoritos.splice(index, 1);
      console.log('Tirando fav')
      console.log(this.usuario)
      this.authService.atualizarFavorito(this.usuarioId, this.usuario)
    }else{
      this.usuario.produtosFavoritos.push(id);
      this.authService.atualizarFavorito(this.usuarioId, this.usuario)
    }
  }

  public filtrarProdutos(categoria: string){
    this.produtosFiltrados = this.produtos.filter(p => p.categoria === categoria);
    return this.produtosFiltrados;
  }

}
