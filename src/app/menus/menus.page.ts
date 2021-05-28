import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuEspecifico } from '../interfaces/menu-especifico';
import { Produto } from '../interfaces/produto';
import { AuthService } from '../services/auth.service';
import { MenusEspService } from '../services/menus-esp.service';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage {

  public userData = this.authService.userData;

  public menusEsp = new Array<MenuEspecifico>();
  private menusEspSubscription: Subscription;

  public produtos = new Array<Produto>();

  private produtosSubscription: Subscription;

  constructor(private authService: AuthService,
              private menusEspService: MenusEspService,
              private produtoService: ProdutoService,) { 
    this.menusEspSubscription = menusEspService.getMenusEsp().subscribe(data => {
      this.menusEsp = data;
    });
    this.produtosSubscription = produtoService.getProdutos().subscribe(data =>{
      this.produtos = data;
    });
  }

  ngOnDestroy(){
    this.menusEspSubscription.unsubscribe();
    this.produtosSubscription.unsubscribe();
  }

}
