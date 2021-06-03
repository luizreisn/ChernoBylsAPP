import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pedido } from '../interfaces/pedido';
import { Produto } from '../interfaces/produto';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage {

  public pedido: Pedido = null;
  public pedidoId: string = null;

  public usuario: Usuario = {};
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  constructor(private authService: AuthService,
              private activeRoute: ActivatedRoute,) { 
    this.carregarDados();
  }

  public async carregarDados(){
    this.pedidoId = this.activeRoute.snapshot.params['id'];
    this.usuarioId = (await this.authService.getAuth().currentUser).uid 
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
      //this.usuario.pedido.map(p => p.data.toDate().toLocaleString())
      this.pedido = this.usuario.pedido.find(p => p.id === this.pedidoId);
      console.log(this.pedido)
    });
    
  }

  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe();
  }

  public filtrar(produto: Produto){
    const c = produto.condimentos.filter(c => c.marcado === true)
    return c;
  }


}
