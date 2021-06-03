import { Component, ViewChild } from '@angular/core';
import { AlertController, IonSlides } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Avisos, BotoesMenu } from '../interfaces/botoes-menu';
import { MenuEspecifico } from '../interfaces/menu-especifico';
import { Produto } from '../interfaces/produto';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';
import { BotoesMenuService } from '../services/botoes-menu.service';
import { MenusEspService } from '../services/menus-esp.service';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario: Usuario = {};
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  public produtos = new Array<Produto>();
  private produtosSubscription: Subscription;
  public produtosFiltrados: Array<Produto>;

  public botoesMenu = new Array<BotoesMenu>();
  private botoesMenuSubscription: Subscription;

  public menusEsp = new Array<MenuEspecifico>();
  private menuEspSubscription: Subscription;

  public avisos = new Array<Avisos>();
  private avisosSubscription: Subscription;

  public focar = 0;

  @ViewChild(IonSlides) slides: IonSlides;

  public slideOpts = {
    initialSlide: 0,
    loop: true
  }

  constructor(private authService: AuthService,
              private produtoService: ProdutoService,
              private botoesMenuService: BotoesMenuService,
              private menusEspService: MenusEspService,
              private alertCtrl: AlertController) { 
    this.carregarDados();
  }

  public async carregarDados(){
    this.usuarioId = (await this.authService.getAuth().currentUser).uid
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
      this.usuario.endereco = data.endereco;
      this.usuario.numero = data.numero;
    });
    this.produtosSubscription = this.produtoService.getProdutos().subscribe(data =>{
      this.produtos = data;
      this.produtosFiltrados = this.produtos;
    });
    this.botoesMenuSubscription = this.botoesMenuService.getBotoesMenu().subscribe(data => {
      this.botoesMenu = data;
    });
    this.menuEspSubscription = this.menusEspService.getMenusEsp().subscribe(data => {
      this.menusEsp = data;
    });     
    this.avisosSubscription = this.botoesMenuService.getAvisos().subscribe(data => {
      this.avisos = data;
    });
  }

  ngOnDestroy(){
    this.produtosSubscription.unsubscribe();
    this.botoesMenuSubscription.unsubscribe();
    this.menuEspSubscription.unsubscribe();
    this.avisosSubscription.unsubscribe();
  }

  public busca(ev: Event){
    let val= (ev as CustomEvent).detail.value;
    if(val && val.trim() !== ''){
      this.produtosFiltrados = this.produtos.filter(termo =>
        termo.nome.toLocaleLowerCase().indexOf(val.toLocaleLowerCase().trim()) > -1)
    }else{
      this.produtosFiltrados = this.produtos;
    }
  }

  public focado(){
    this.focar = 1;
  }

  public desfocado(){
    this.focar = 0;
  }

  public voltarSlide(){
    this.slides.slidePrev();
  }

  public avancarSlide(){
    this.slides.slideNext();
  }

  public async sair(){
    const alertaSair = await this.alertCtrl.create({
      header: 'Deseja mesmo sair?',
      buttons: [{
        text: 'Cancelar'
      },{
        text: 'Sair',
        handler: () => {
          this.authService.sair();
        }
      }]
    })
    await alertaSair.present();
  }

}
