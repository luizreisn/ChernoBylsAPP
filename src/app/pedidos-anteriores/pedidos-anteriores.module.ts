import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosAnterioresPageRoutingModule } from './pedidos-anteriores-routing.module';

import { PedidosAnterioresPage } from './pedidos-anteriores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosAnterioresPageRoutingModule
  ],
  declarations: [PedidosAnterioresPage]
})
export class PedidosAnterioresPageModule {}
