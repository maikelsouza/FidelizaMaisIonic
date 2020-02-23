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
import { EstabelecimentoMeuEstabelecimentoComponent } from './estabelecimento-meu-estabelecimento/estabelecimento-meu-estabelecimento.component';
import { LoginService } from '../login/shared/services/login.service';




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
    EstabelecimentoDetalhePage,
    EstabelecimentoMeuEstabelecimentoComponent  
  ]
})


export class EstabelecimentosModule {}
