import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/usuarios/shared/services/usuario.service';
import { AlertaService } from 'src/app/common/service/alerta.service';
import { EmailModel } from 'src/app/common/model/EmailModel';
import { Router } from '@angular/router';
import { getMaxListeners } from 'process';


@Component({
  selector: 'app-esqueci-minha-senha-cadastro',
  templateUrl: './esqueci-minha-senha-cadastro.component.html',
  styleUrls: ['./esqueci-minha-senha-cadastro.component.scss'],
})
export class EsqueciMinhaSenhaCadastroComponent implements OnInit {

  private formulario : FormGroup;  
  
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertSrv: AlertaService,
    private route: Router
  ) { }

  ngOnInit() {
    this.montarCamposTela();
  }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      email: [null,[Validators.required, Validators.email]]
    });
  }
  
  async onSubmit(): Promise<void>{
    try {       
      const email = this.formulario.get("email").value;
      const usuarioResultado = await this.usuarioService.buscarPorEmail(email);
      
      if (usuarioResultado.success){
        if (usuarioResultado.data == null){
          this.alertSrv.alert('Email não cadastrado!',`O email: ${email} não foi encontrado no sistema.`);        
        }else{
          let resultado = await this.usuarioService.gerarNovaSenha(usuarioResultado.data.id, this.criarEmailModel(email));
          if (resultado.success){            
            this.alertSrv.toast('Você recebera um e-mail com a nova senha');        
            this.route.navigate(['/login']);     
          }
          
        }
      }
    } catch (error) {
        console.log('Erro ao buscar um usuário por email', error);    
    }
  }   

  public get email() {return this.formulario.get('email')}
  


  private criarEmailModel(to: string) : EmailModel{
    let emailModel: EmailModel = new EmailModel();
    emailModel.to = to;    
    emailModel.subject = "Fideliza Mais - Esqueci Minha Senha";   
    emailModel.text = "Sua senha foi gerada com sucesso: Senha: "    
    return emailModel;
  }
}
