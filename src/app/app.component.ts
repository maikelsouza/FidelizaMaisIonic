import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LoginService } from './login/shared/services/login.service';
import { Usuario } from './usuarios/shared/models/usuario';
import { UsuarioService } from './usuarios/shared/services/usuario.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  mostrarMenu: boolean = false;
  usuarioLogado: Usuario;
  backButtonSubscription: Subscription;
  mostrarMenuSubscription: Subscription;
  usuarioLogadoSubscription: Subscription;

  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    public navController: NavController,
    private router: Router
    ) {    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();      
    });
    
  }

  logoff(){
    UsuarioService.RemoverLogin();
    this.navController.navigateRoot('/');      
  }

  ngOnInit(){
    
    this.mostrarMenuSubscription = this.loginService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );  

    this.mostrarMenuSubscription = this.loginService.mostrarItemMenuEmitter.subscribe(
      usuario => this.usuarioLogado = usuario
    );    
 
    this.usuarioLogadoSubscription = this.platform.backButton.subscribe(res => {      
      if (this.router.url === '/login'){
        navigator['app'].exitApp();
      }      
    });   
    
  }

  ngOnDestroy(): void {    
    this.backButtonSubscription.unsubscribe();
    this.mostrarMenuSubscription.unsubscribe();
    this.usuarioLogadoSubscription.unsubscribe();
  }


}
