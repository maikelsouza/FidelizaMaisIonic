import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { BrMaskerModule } from 'br-mask';

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
import { UsuarioService } from './usuarios/shared/services/usuario.service';
import { PontosClientePontuarComponent } from './pontosClientes/pontos-cliente-pontuar/pontos-cliente-pontuar.component';
import { PontosClienteResgatarComponent } from './pontosClientes/pontos-cliente-resgatar/pontos-cliente-resgatar.component';
import { EsqueciMinhaSenhaCadastroComponent } from './esqueciMinhaSenha/esqueci-minha-senha-cadastro/esqueci-minha-senha-cadastro.component';
import { FormEstabelecimentoPage } from './estabelecimentos/form-estabelecimento/form-estabelecimento.page';
import { ListaEstabelecimentoPage } from './estabelecimentos/lista-estabelecimento/lista-estabelecimento.page';
import { EstabelecimentoDetalhePage } from './estabelecimentos/estabelecimento-detalhe/estabelecimento-detalhe.page';
import { EstabelecimentoService } from './estabelecimentos/shared/services/estabelecimento.service';
import { EstabelecimentoVisualizarComponent } from './estabelecimentos/estabelecimento-visualizar/estabelecimento-visualizar.component';
import { HttpService } from './common/service/http.service';
import { SpinnerService } from './common/service/spinner.service';
import { EmailService } from './common/service/email.service';
import { UsuarioListaComponent } from './usuarios/usuario-lista/usuario-lista.component';
import { UsuarioDetalheComponent } from './usuarios/usuario-detalhe/usuario-detalhe.component';
import { UsuarioCadastroComponent } from './usuarios/usuario-cadastro/usuario-cadastro.component';
import { UsuarioMeuPerfilComponent } from './usuarios/usuario-meu-perfil/usuario-meu-perfil.component';
import { UsuarioAtualizarSenhaComponent } from './usuarios/usuario-atualizar-senha/usuario-atualizar-senha.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CartaoFidelidadeCadastroComponent,
    CartaoFidelidadeListaUsuarioComponent,
    CartaoFidelidadeEditarComponent,
    CartaoFidelidadeListaEstabelecimentoComponent,
    ProgramaFidelidadeListaUsuarioComponent,    
    ProgramaFidelidadeCadastroComponent,
    ProgramaFidelidadeListaEstabelecimentoComponent,
    PontosClientePontuarComponent,
    PontosClienteResgatarComponent,
    EsqueciMinhaSenhaCadastroComponent,
    FormEstabelecimentoPage,
    ListaEstabelecimentoPage,
    EstabelecimentoDetalhePage,      
    EstabelecimentoVisualizarComponent,
    UsuarioCadastroComponent,
    UsuarioListaComponent,
    UsuarioDetalheComponent,
    UsuarioMeuPerfilComponent,
    UsuarioAtualizarSenhaComponent     
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,    
    NgxSpinnerModule, 
    ReactiveFormsModule,
    BrMaskerModule,    
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
    EstabelecimentoService,
    StatusBar,
    SplashScreen,
    HttpService,
    SpinnerService,
    EmailService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  
  
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
  
})
export class AppModule {}
