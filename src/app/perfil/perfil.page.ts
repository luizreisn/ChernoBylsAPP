import { Component } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  public usuario: Usuario = {};
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  private loading: any;

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
    this.carregarUsuarios();
  }
  
  public async carregarUsuarios(){
    this.usuarioId = (await this.authService.getAuth().currentUser).uid 
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
    })
  }

  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe();
  }

  private async atualizarUsuario(){  
    await this.carregando();
    try{
      this.authService.atualizarUsuario(this.usuarioId, this.usuario)
      await this.loading.dismiss();
      this.toast('Dados atualizados com sucesso!');
    }catch(error){
      this.toast('Erro ao atualizar usuário!');
      this.loading.dismiss();
    }
  }

  async carregando(){
    this.loading = await this.loadingCtrl.create({message: 'Por favor aguarde...'}); 
    return this.loading.present();
  }

  async toast(message: string){
    const toast = await this.toastCtrl.create({ message, duration: 2000, color: 'primary'});
    toast.present();
  }

  public async atualizar(){
    const alertaSair = await this.alertCtrl.create({
      header: 'Deseja mesmo atualizar os dados?',
      message: 'Os dados antigos serão excluidos permanentemente!',
      buttons: [{
        text: 'Cancelar',
        handler: () => {
          this.carregarUsuarios();
        }
      },{
        text: 'Atualizar',
        handler: () => {
          this.atualizarUsuario();
        }
      }]
    })
    await alertaSair.present();
  }


}
