import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { UsuarioService } from './../../usuarios/shared/services/usuario.service';
import { LoginService } from './../shared/services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formulario : FormGroup;  

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,        
    private navController: NavController,
    private route: Router
  ) { }
 
  ngOnInit() {
    console.info("ngOnInit - Login");   
    this.montarCamposTela();   
  }

  ngOnDestroy(){         
    console.info("ngOnDestroy - Login");
  }

  private montarCamposTela() {
    const { email, senha } = UsuarioService.getManterMeConectado
    this.formulario = this.formBuilder.group({
      login: [email, [Validators.required, Validators.email]], 
      senha: [senha, Validators.required], mantermeConectado: [UsuarioService.IsMantermeConectado]
    });
  }

  
  public get login() {return this.formulario.get('login')}
  public get senha() {return this.formulario.get('senha')}  
  

  async onSubmit(): Promise<void>{
    try {             
        let login = this.formulario.get("login").value;
        let senha = this.formulario.get("senha").value;
        let mantermeConectado = this.formulario.get("mantermeConectado").value;
        let resultado = await this.loginService.autenticar(login,senha);          
        if (resultado.success){
          UsuarioService.RegistrarLogin(resultado.data);
          if (mantermeConectado){
            UsuarioService.RegistrarMantermeConectado(login,senha)
          }
          const clientes = 'CLIENTES';    
          if (resultado.data.usuario[0].GrupoUsuario.nome === clientes){            
            this.route.navigate(['/estabelecimento/lista'], { queryParams: { tipoUsuario: clientes } });          
          }else{         
            this.navController.navigateForward('/principal'); 
          }
        }      
    } catch (error) {
        console.log('Erro ao logar um Usuário', error);    
    }
  }  


  onClickCheckBox(event: any){
    const checked :boolean = event.target.checked;
    if (checked){
      UsuarioService.RemoverMantermeConectado();
    }
  } 


}
