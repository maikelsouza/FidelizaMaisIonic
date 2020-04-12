import { AlertaService } from './../../common/service/alerta.service';
import { UsuarioService } from './../shared/services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      id : [null], 
      nome: [null, Validators.required], ativo: [true], 
      cpf: [null], email: [null, [Validators.required, Validators.email]],
      sexo: [null, Validators.required],
      dataNascimento: [null], 
      senha: [null,Validators.required], 
      confirmarSenha: [null, Validators.required], 
      grupoUsuarioId: [3]
    });
  }

  public get nome() {return this.formulario.get('nome')}
  public get email() {return this.formulario.get('email')}
  public get sexo() {return this.formulario.get('sexo')}
  public get senha() {return this.formulario.get('senha')}
  public get confirmarSenha() {return this.formulario.get('confirmarSenha')}

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
