import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosAnterioresPage } from './pedidos-anteriores.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosAnterioresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosAnterioresPageRoutingModule {}
