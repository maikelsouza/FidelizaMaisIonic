import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { FormEstabelecimentoPage } from './form-estabelecimento.page';
import { EstabelecimentoService } from './../shared/estabelecimento.service';

const routes: Routes = [
  {
    path: '',
    component: FormEstabelecimentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    RouterModule.forChild(routes)
  ],
 
  declarations: [FormEstabelecimentoPage]
})


export class FormEstabelecimentoPageModule {}
