import { Component, ViewChild } from '@angular/core';
import { AlertController, IonSlides } from '@ionic/angular';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public userData = this.authService.userData;

  public focar = 0;

  @ViewChild(IonSlides) slides: IonSlides;

  public slideOpts = {
    initialSlide: 0,
    loop: true
  }

  constructor(private authService: AuthService,
              private alertCtrl: AlertController) {        
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
