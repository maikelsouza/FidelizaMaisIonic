import { AlertaService } from './../../common/service/alerta.service';
import { UsuarioService } from './../shared/services/usuario.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
})
export class UsuarioCadastroComponent implements OnInit {

  private formulario : FormGroup;  
  

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertService: AlertaService
  ) { }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      id : [null], nome: [null], ativo: [true], cpf: [null], email: [null],sexo: [null],
      dataNascimento: [null], senha: [null], confirmarSenha: [null], grupoUsuarioId: [3]
    });
  }

  private validarSenha(): Boolean{
    if (this.formulario.get("senha").value == this.formulario.get("confirmarSenha").value){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit() {
    this.montarCamposTela();
  }

  async onSubmit(): Promise<void>{
    try { 
      if (this.validarSenha()){
        let resultado = await this.usuarioService.salvar(this.formulario.value);  
        if (resultado.success){
          this.alertService.toast('Usuário salvo com sucesso!');
        }
      }else{
        this.alertService.toast('O campo senha e confirmar senha estão diferentes');
      }
    } catch (error) {
        console.log('Erro ao salvar um Usuario', error);    
    }
  }   

}
