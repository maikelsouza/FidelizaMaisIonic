import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginService } from './login/shared/services/login.service';
import { LoginComponent } from './login/login/login.component';
import { CartaoFidelidadeService } from './cartoesFidelidade/shared/services/cartao-fidelidade.service';
import { CartaoFidelidadeEditarComponent } from './cartoesFidelidade/cartao-fidelidade-editar/cartao-fidelidade-editar.component';
import { CartaoFidelidadeCadastroComponent } from './cartoesFidelidade/cartao-fidelidade-cadastro/cartao-fidelidade-cadastro.component';
import { CartaoFidelidadeListaUsuarioComponent } from './cartoesFidelidade/cartao-fidelidade-lista-usuario/cartao-fidelidade-lista-usuario.component';
import { CartaoFidelidadeListaEstabelecimentoComponent } from './cartoesFidelidade/cartao-fidelidade-lista-estabelecimento/cartao-fidelidade-lista-estabelecimento.component';
import { ProgramaFidelidadeCadastroComponent } from './programasFidelidade/programa-fidelidade-cadastro/programa-fidelidade-cadastro.component';
import { ProgramaFidelidadeListaUsuarioComponent } from './programasFidelidade/programa-fidelidade-lista-usuario/programa-fidelidade-lista-usuario.component';
import { ProgramaFidelidadeListaEstabelecimentoComponent } from './programasFidelidade/programa-fidelidade-lista-estabelecimento/programa-fidelidade-lista-estabelecimento.component';
import { ProgramaFidelidadeService } from './programasFidelidade/shared/services/programa-fidelidade.service';
import { PontuarClienteCadastroComponent } from './pontuarClientes/pontuar-cliente-cadastro/pontuar-cliente-cadastro.component';
import { UsuarioService } from './usuarios/shared/services/usuario.service';
import { ResgatarPontosClienteResgateComponent } from './resgatarPontosClientes/resgatar-pontos-cliente-resgate/resgatar-pontos-cliente-resgate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CartaoFidelidadeCadastroComponent,
    CartaoFidelidadeListaUsuarioComponent,
    CartaoFidelidadeListaEstabelecimentoComponent,
    CartaoFidelidadeEditarComponent,
    ProgramaFidelidadeCadastroComponent,
    ProgramaFidelidadeListaEstabelecimentoComponent,
    ProgramaFidelidadeListaUsuarioComponent,
    PontuarClienteCadastroComponent,
    ResgatarPontosClienteResgateComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,    
    NgxSpinnerModule, 
    ReactiveFormsModule,
    FormsModule,   
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule  

  ],
  providers: [
    LoginService,
    CartaoFidelidadeService,
    ProgramaFidelidadeService,
    UsuarioService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  
  
  bootstrap: [AppComponent],
  
})
export class AppModule {}
