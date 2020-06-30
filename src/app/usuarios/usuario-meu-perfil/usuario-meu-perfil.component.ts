import { AlertaService } from './../../common/service/alerta.service';
import { UsuarioService } from './../shared/services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/models/usuario';
import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/shared/services/login.service';

@Component({
  selector: 'app-usuario-meu-perfil',
  templateUrl: './usuario-meu-perfil.component.html',
  styleUrls: ['./usuario-meu-perfil.component.scss'],
})
export class UsuarioMeuPerfilComponent implements OnInit {

  private formulario : FormGroup;  
  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertService: AlertaService,
    private loginService : LoginService,
    private router: Router) { }

  ngOnInit() {
    this.montarCamposTela();
    this.carregarDadosUsuario();
  }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      id : [null], nome: [null, Validators.required], 
      cpf: [null], email: [null,[Validators.required, Validators.email]],
      sexo: [null,Validators.required],
      dataNascimento: [null]
    });
  }

  public get nome() {return this.formulario.get('nome')}
  public get email() {return this.formulario.get('email')}
  public get sexo() {return this.formulario.get('sexo')}

  private async carregarDadosUsuario(): Promise<void> {
    try {             
        let resultado = await this.usuarioService.buscarPorId( AutenticadorService.UsuarioLogado[0].id);       
        let usuarioLogado = resultado.data;
        this.formulario = this.formBuilder.group({
          id : [usuarioLogado.id], nome: [usuarioLogado.nome, Validators.required], cpf: [usuarioLogado.cpf], 
          email: [usuarioLogado.email,[Validators.required, Validators.email]],
           sexo: [usuarioLogado.sexo, Validators.required], dataNascimento: [usuarioLogado.dataNascimento]
        });
    } catch (error) {
      console.log('Erro ao carregar os dados do usuário logado', error);
    }
  }

  private montarCamposTela2() {
    this.formulario = this.formBuilder.group({
      id : [null], senha: [null], confirmarSenha: [null]
    });
  }

  private validarSenha(): Boolean{
    if (this.formulario.get("senha").value == this.formulario.get("confirmarSenha").value){
      return true;
    }else{
      return false;
    }
  }

  async onSubmit(): Promise<void>{
    try {        
        let resultado = await this.usuarioService.atualizar(this.formulario.get("id").value,this.formulario.value);  
        if (resultado.success){       
          this.router.navigate(['/principal']);          
          this.alertService.toast('Usuário atualizado com sucesso!');
        }
    } catch (error) {
        console.log('Erro ao atualizar o usuário', error);    
    }
  } 
  
  
  async onSubmit2(): Promise<void>{
    try { 
      if (this.validarSenha()){
        let usuario : Usuario = new Usuario();
        usuario.senha = this.formulario.get("senha").value;
        console.log(this.formulario.get("id").value);
        let resultado = await this.usuarioService.atualizar(this.formulario.get("id").value,usuario);  
        if (resultado.success){
          this.alertService.toast('Senha atualizada com sucesso!');
        }
      }else{
        this.alertService.toast('O campo senha e confirmar senha estão diferentes');
      }
    } catch (error) {
        console.log('Erro ao atualizar a senha', error);    
    }
  }   
}
