import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaEstabelecimentoPage } from './lista-estabelecimento.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEstabelecimentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaEstabelecimentoPage]
})
export class ListaEstabelecimentoPageModule {}
