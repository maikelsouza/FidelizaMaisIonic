import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/shared/services/login.service';
import { LoginComponent } from './login/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CartaoFidelidadeService } from './cartoesFidelidade/shared/services/cartao-fidelidade.service';
import { CartaoFidelidadeEditarComponent } from './cartoesFidelidade/cartao-fidelidade-editar/cartao-fidelidade-editar.component';
import { CartaoFidelidadeCadastroComponent } from './cartoesFidelidade/cartao-fidelidade-cadastro/cartao-fidelidade-cadastro.component';
import { CartaoFidelidadeListaUsuarioComponent } from './cartoesFidelidade/cartao-fidelidade-lista-usuario/cartao-fidelidade-lista-usuario.component';
import { CartaoFidelidadeListaEstabelecimentoComponent } from './cartoesFidelidade/cartao-fidelidade-lista-estabelecimento/cartao-fidelidade-lista-estabelecimento.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CartaoFidelidadeCadastroComponent,
    CartaoFidelidadeListaUsuarioComponent,
    CartaoFidelidadeListaEstabelecimentoComponent,
    CartaoFidelidadeEditarComponent
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
    
      
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  
  
  bootstrap: [AppComponent],
  
})
export class AppModule {}
