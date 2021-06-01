import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Pedido } from '../interfaces/pedido';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage {

  public pedido: Pedido = {};
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
      this.usuario.pedido.map(p => p.data.toLocaleDateString)
      this.pedido = this.usuario.pedido.find(p => p.id === this.pedidoId);
    });
  }

  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe();
  }

  public millis(data: Date){

  }

}
