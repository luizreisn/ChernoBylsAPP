import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage {

  public usuario: Usuario = null;
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  public loading: any;

  constructor(private authService: AuthService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private nav: NavController) { 
    this.carregarDados();
  }

  public async carregarDados(){
    this.usuarioId = (await this.authService.getAuth().currentUser).uid
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
    })
  }

  public async atualizarEndereco(){
    await this.carregando();
    try{
      this.authService.atualizarEndereco(this.usuarioId, this.usuario.dadosEndereco);
      await this.loading.dismiss();
      this.toast('Endereço atualizado com sucesso!');
      this.nav.back();
    }catch(error){
      this.toast('Erro ao atualizar endereço!')
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

}
