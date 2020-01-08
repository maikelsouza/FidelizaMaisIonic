import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CartaoFidelidadeCadastroComponent } from './cartao-fidelidade-cadastro/cartao-fidelidade-cadastro.component';
import { CartaoFidelidadeListaEstabelecimentoComponent } from './cartao-fidelidade-lista-estabelecimento/cartao-fidelidade-lista-estabelecimento.component';
import { CartaoFidelidadeListaUsuarioComponent } from './cartao-fidelidade-lista-usuario/cartao-fidelidade-lista-usuario.component';
import { CartaoFidelidadeEditarComponent } from './cartao-fidelidade-editar/cartao-fidelidade-editar.component';
import { CartaoFidelidadeService } from './shared/services/cartao-fidelidade.service';
import { cartoesFidelidadeRoutesModule } from './cartoesFidelidade-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    IonicModule,    
    cartoesFidelidadeRoutesModule
  ],

  providers: [
    CartaoFidelidadeService      
  ],
    
  declarations: [
    CartaoFidelidadeCadastroComponent,
    CartaoFidelidadeListaUsuarioComponent,
    CartaoFidelidadeListaEstabelecimentoComponent,
    CartaoFidelidadeEditarComponent
  ]
})


export class CartoesFidelidadeModule {}
