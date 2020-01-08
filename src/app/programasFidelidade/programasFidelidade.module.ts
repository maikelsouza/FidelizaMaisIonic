import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { programasFidelidadeRoutesModule } from './programasFidelidade-routing.module';
import { ProgramaFidelidadeService } from './shared/services/programa-fidelidade.service';
import { ProgramaFidelidadeCadastroComponent } from './programa-fidelidade-cadastro/programa-fidelidade-cadastro.component';
import { ProgramaFidelidadeListaEstabelecimentoComponent } from './programa-fidelidade-lista-estabelecimento/programa-fidelidade-lista-estabelecimento.component';
import { ProgramaFidelidadeListaUsuarioComponent } from './programa-fidelidade-lista-usuario/programa-fidelidade-lista-usuario.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    IonicModule,    
    programasFidelidadeRoutesModule
  ],

  providers: [
    ProgramaFidelidadeService
  ],
    
  declarations: [
    ProgramaFidelidadeCadastroComponent,
    ProgramaFidelidadeListaEstabelecimentoComponent,
    ProgramaFidelidadeListaUsuarioComponent
  ]
})


export class ProgramasFidelidadeModule {}
