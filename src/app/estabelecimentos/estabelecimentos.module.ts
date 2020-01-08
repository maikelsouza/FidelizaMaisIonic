import { EstabelecimentoDetalhePage } from './estabelecimento-detalhe/estabelecimento-detalhe.page';
import { ListaEstabelecimentoPage } from './lista-estabelecimento/lista-estabelecimento.page';
//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TipoEstabelecimentoService } from '../tipoEstabelecimento/shared/services/tipo-estabelecimento.service';
import { EstabelecimentoService } from './shared/services/estabelecimento.service';
import { EstabelecimentosRoutesModule } from './estabelecimentos-routing.module';
import { FormEstabelecimentoPage } from './form-estabelecimento/form-estabelecimento.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,    
    EstabelecimentosRoutesModule
  ],
  providers: [
    EstabelecimentoService,    
    TipoEstabelecimentoService
  ],
    
  declarations: [
    FormEstabelecimentoPage,
    ListaEstabelecimentoPage,
    EstabelecimentoDetalhePage  
  ]
})


export class EstabelecimentosModule {}
